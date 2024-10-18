"use server";

import prisma from "@/lib/db/prisma"; // Import your Prisma client

export async function addSpouse(personId, spouseData) {
  try {
    // Step 1: Create the new spouse record
    const spouse = await prisma.person.create({
      data: {
        name: spouseData.name,
        gender: spouseData.gender,
        dob: new Date(spouseData.dob),
        alive: spouseData.alive,
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
