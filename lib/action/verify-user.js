"use server";

import prisma from "../db/prisma";

const verifyUser = async (key, familyId) => {
  const family = await prisma.family.findUnique({
    where: { id: familyId },
    include: {
      root: true,
    },
  });

  if (!family) {
    throw new Error("Family not found");
  }

  if (family.key !== key) {
    throw new Error("Wrong key");
  }

  return { message: "Access granted", status: 200 };
};

export default verifyUser;
