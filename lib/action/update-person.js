// utils/updatePerson.js
"use server";

import prisma from "@/lib/db/prisma"; // Ensure Prisma client is initialized

// Function to update a person's data
export async function updatePerson(personId, updateData, key, familyId) {
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

    const updatedPerson = await prisma.person.update({
      where: {
        id: personId, // The person's unique ID
      },
      data: {
        name: updateData.name, // Update the person's name
        gender: updateData.gender, // Update the gender
        dob: updateData.dob ? new Date(updateData.dob) : undefined, // Ensure the date is correctly formatted, if provided
        alive: updateData.alive, // Update alive status
        url: updateData.url,
        phoneNumber: Number(updateData.phoneNumber),
      },
    });

    return {
      message: "Person updated successfully",
      status: 201,
    }; // Return the updated person
  } catch (error) {
    console.error("Error updating person:", error);
    throw error;
  }
}
