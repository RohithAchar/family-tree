// utils/getPerson.js
"use server";

import prisma from "@/lib/db/prisma"; // Ensure Prisma client is initialized

// Function to get a person's data by their ID
export async function getPerson(personId) {
  try {
    const person = await prisma.person.findUnique({
      where: { id: personId },
    });

    if (!person) {
      throw new Error("Person not found");
    }

    return {
      id: person.id,
      name: person.name,
      gender: person.gender,
      dob: person.dob.toISOString().split("T")[0], // Format date to YYYY-MM-DD
      alive: person.alive,
    };
  } catch (error) {
    console.error("Error fetching person:", error);
    throw error;
  }
}
