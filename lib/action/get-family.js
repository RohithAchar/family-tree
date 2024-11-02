// utils/getFamilyMembers.js
"use server";

import prisma from "@/lib/db/prisma"; // Ensure you have your Prisma client initialized here

// Helper function to recursively fetch family members and their details
async function getFamilyTree(personId) {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: {
      spouse: true,
      children: true,
    },
  });

  if (!person) {
    return null;
  }

  // Format the person data with the required attributes
  const formattedPerson = {
    id: person.id,
    name: person.name,
    attributes: {
      gender: person.gender,
      dob: person.dob.toISOString().split("T")[0], // Format date to YYYY-MM-DD
      alive: person.alive,
      url: person.url,
      phoneNumber: person.phoneNumber,
    },
    spouse: person.spouse
      ? {
          name: person.spouse.name,
          id: person.spouse.id,
          attributes: {
            gender: person.spouse.gender,
            dob: person.spouse.dob.toISOString().split("T")[0],
            alive: person.spouse.alive,
            url: person.spouse.url,
            phoneNumber: person.spouse.phoneNumber,
          },
        }
      : null,
    children: await Promise.all(
      person.children.map((child) => getFamilyTree(child.id))
    ),
  };

  return formattedPerson;
}

// Main function to get family members based on family ID
export async function getFamilyMembers(familyId, key) {
  try {
    // Fetch the family using the familyId
    const family = await prisma.family.findUnique({
      where: { id: familyId },
      include: {
        root: true,
      },
    });

    if (!family) {
      throw new Error("Family not found");
    }

    // Get the root person and recursively fetch their family tree
    const familyTree = await getFamilyTree(family.rootId);
    return familyTree;
  } catch (error) {
    // Return 404 message
    return { msg: "Wrong family id" };
    // You can handle this error in your component
  }
}
