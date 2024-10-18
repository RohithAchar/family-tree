// utils/deletePerson.js
"use server";

import prisma from "@/lib/db/prisma"; // Ensure Prisma client is initialized

// Function to delete a person by their ID
export async function deletePerson(personId) {
  console.log("Deleting: ", personId);
  try {
    const deletedPerson = await prisma.person.delete({
      where: { id: personId },
    });

    return deletedPerson;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
}
