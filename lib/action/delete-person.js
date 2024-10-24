// utils/deletePerson.js
"use server";

import prisma from "@/lib/db/prisma"; // Ensure Prisma client is initialized

// Function to delete a person by their ID
export async function deletePerson(personId, key, familyId) {
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

    if (family.rootId === personId) {
      return {
        message: "Cannot delete root person",
        status: 400,
      };
    }

    const deletedPerson = await prisma.person.delete({
      where: { id: personId },
    });

    return deletedPerson;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
}
