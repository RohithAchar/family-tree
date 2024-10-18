// utils/updatePerson.js
"use server";

import prisma from "@/db/prisma"; // Ensure Prisma client is initialized

// Function to update a person's data
export async function updatePerson(personId, updateData) {
  try {
    // Update the person's data in the database
    const updatedPerson = await prisma.person.update({
      where: {
        id: personId, // The person's unique ID
      },
      data: {
        name: updateData.name, // Update the person's name
        gender: updateData.gender, // Update the gender
        dob: updateData.dob ? new Date(updateData.dob) : undefined, // Ensure the date is correctly formatted, if provided
        alive: updateData.alive, // Update alive status
      },
    });

    return updatedPerson; // Return the updated person
  } catch (error) {
    console.error("Error updating person:", error);
    throw error; // Propagate the error to handle it in the caller
  }
}
