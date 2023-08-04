import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "testseed1@remix.run";

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    await prisma.user.delete({ where: { email } }).catch(() => {});
  } else {
    const hashedPassword = await bcrypt.hash("test123", 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        currentProjectId: "1",
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });

    const createdProject = await prisma.project.create({
      data: {
        title: "Seed project",
        tags: ["seed-tag"],
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });

    const userWithProject = await prisma.user.update({
      where: {
        email,
      },
      data: {
        currentProjectId: createdProject.id,
      },
      include: {
        projects: true,
      },
    });

    console.log(`Created user`, JSON.stringify(userWithProject, null, 2));
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
