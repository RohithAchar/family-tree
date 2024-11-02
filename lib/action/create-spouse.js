"use server";

import prisma from "@/lib/db/prisma"; // Import your Prisma client

export async function addSpouse(personId, spouseData, key, familyId) {
  try {
    const family = await prisma.family.findUnique({
      where: { id: familyId },
    });

    if (family.key !== key) {
      return {
        message: "Unauthorized",
        status: 401,
      };
    }
    // Step 1: Create the new spouse record
    const spouse = await prisma.person.create({
      data: {
        name: spouseData.name,
        gender: spouseData.gender,
        dob: new Date(spouseData.dob),
        alive: spouseData.alive,
        url: spouseData.url,
        phoneNumber: spouseData.phoneNumber,
        // familyId: spouseData.familyId,
        // attributes: spouseData.attributes, // Optional custom attributes
      },
    });

    // Step 2: Update the existing person with spouseId (linking the spouse)
    const updatedPerson = await prisma.person.update({
      where: { id: personId },
      data: {
        spouseId: spouse.id,
      },
    });

    // Step 3: Update the newly created spouse with the personId (linking back)
    await prisma.person.update({
      where: { id: spouse.id },
      data: {
        spouseId: personId,
      },
    });

    return { person: updatedPerson, spouse };
  } catch (error) {
    console.error("Error adding spouse:", error);
    throw new Error("Failed to add spouse");
  }
}
