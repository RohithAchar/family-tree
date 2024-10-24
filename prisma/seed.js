const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create the Achar family
  const acharFamily = await prisma.family.create({
    data: {
      name: "Achar",
      key: 1234,
      root: {
        create: {
          name: "Root",
          gender: "male",
          dob: new Date("1950-01-01"),
          alive: true,
          url: "/spiderman.jpeg",
          attributes: {
            gender: "male",
            dob: "1950-01-01",
            alive: true,
            url: "/spiderman.jpeg",
          },
        },
      },
    },
  });

  // Create Child 1 and their spouse
  const child1 = await prisma.person.create({
    data: {
      name: "Child 1",
      gender: "female",
      dob: new Date("1975-05-15"),
      alive: true,
      url: "/spiderman.jpeg",
      attributes: {
        gender: "female",
        dob: "1975-05-15",
        alive: true,
        url: "/spiderman.jpeg",
      },
      family: { connect: { id: acharFamily.id } },
      parent: { connect: { id: acharFamily.rootId } },
    },
  });

  const spouse1 = await prisma.person.create({
    data: {
      name: "Spouse 1",
      gender: "male",
      dob: new Date("1973-09-10"),
      alive: true,
      url: "/spiderman.jpeg",
      attributes: {
        gender: "male",
        dob: "1973-09-10",
        alive: true,
        url: "/spiderman.jpeg",
      },
      family: { connect: { id: acharFamily.id } },
    },
  });

  // Update spouse relationships
  await prisma.person.update({
    where: { id: child1.id },
    data: { spouse: { connect: { id: spouse1.id } } },
  });

  // Create Grandchild 1
  await prisma.person.create({
    data: {
      name: "Grandchild 1",
      gender: "male",
      dob: new Date("2000-10-10"),
      alive: true,
      url: "/spiderman.jpeg",
      attributes: {
        gender: "male",
        dob: "2000-10-10",
        alive: true,
        url: "/spiderman.jpeg",
      },
      family: { connect: { id: acharFamily.id } },
      parent: { connect: { id: child1.id } },
    },
  });

  // Create Child 2 and their spouse
  const child2 = await prisma.person.create({
    data: {
      name: "Child 2",
      gender: "male",
      dob: new Date("1978-03-20"),
      alive: false,
      url: "/spiderman.jpeg",
      attributes: {
        gender: "male",
        dob: "1978-03-20",
        alive: false,
        url: "/spiderman.jpeg",
      },
      family: { connect: { id: acharFamily.id } },
      parent: { connect: { id: acharFamily.rootId } },
    },
  });

  const spouse2 = await prisma.person.create({
    data: {
      name: "Spouse 2",
      gender: "female",
      dob: new Date("1980-02-15"),
      alive: true,
      url: "/spiderman.jpeg",
      attributes: {
        gender: "female",
        dob: "1980-02-15",
        alive: true,
        url: "/spiderman.jpeg",
      },
      family: { connect: { id: acharFamily.id } },
    },
  });

  // Update spouse relationships
  await prisma.person.update({
    where: { id: child2.id },
    data: { spouse: { connect: { id: spouse2.id } } },
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
