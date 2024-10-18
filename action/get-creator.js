"use server";

import prisma from "@/db/prisma";

export async function getCreator(familyId) {
  const family = await prisma.family.findUnique({
    where: { id: familyId },
    include: {
      root: true,
    },
  });

  return family.creatorId;
}
