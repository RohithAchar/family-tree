"use server";

import prisma from "../db/prisma"; // Adjust based on your prisma setup

export const getFamilyByName = async (familyName) => {
  console.log("Name: " + familyName);
  try {
    const families = await prisma.family.findMany({
      where: {
        name: {
          contains: familyName, // Match family names that contain the given familyName
          mode: "insensitive", // Make the search case-insensitive
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!families || families.length === 0) {
      throw new Error("No matching families found");
    }

    return families.map((family) => ({
      familyId: family.id,
      name: family.name,
    }));
  } catch (error) {
    return {
      error: "No data",
    };
  }
};
