// utils/createChild.js
"use server";
import prisma from "@/lib/db/prisma";

export async function createChild(parentId, childData) {
  try {
    // Ensure the parent exists
    const parent = await prisma.person.findUnique({
      where: { id: parentId },
    });

    if (!parent) {
      throw new Error("Parent not found");
    }

    // Create the child and associate it with the parent
    const newChild = await prisma.person.create({
      data: {
        name: childData.name,
        gender: childData.gender,
        dob: new Date(childData.dob), // Ensure date is in the correct format
        alive: childData.alive,
        url: childData.url,
        parent: {
          connect: { id: parentId }, // Establish the parent-child relationship
        },
        // family: {
        //   connect: { id: parent.familyId }, // Associate the child with the same family as the parent
        // },
      },
    });

    return newChild;
  } catch (error) {
    console.error("Error creating child:", error);
    throw error; // Handle the error in your component or logic
  }
}
