// utils/createFamily.js
"use server";

import prisma from "@/lib/db/prisma"; // Ensure Prisma client is initialized

export async function createNewFamily(familyName, rootPersonData, key) {
  try {
    // Create the new family and the root person in a single transaction
    const newFamily = await prisma.family.create({
      data: {
        name: familyName,
        key: key,
        root: {
          create: {
            name: rootPersonData.name,
            gender: rootPersonData.gender,
            dob: new Date(rootPersonData.dob), // Ensure the date is correctly formatted
            alive: rootPersonData.alive,
            url: rootPersonData.url,
            phoneNumber: rootPersonData.phoneNumber,
          },
        },
      },
      include: {
        root: true, // Include the root person in the returned data
      },
    });

    return newFamily;
  } catch (error) {
    console.error("Error creating new family:", error);
    throw error;
  }
}
