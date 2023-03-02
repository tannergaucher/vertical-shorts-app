import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const project = await prisma.project.create({
    data: {
      id: "hr-123",
      title: "Home Rice",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const content = await prisma.content.create({
    data: {
      slug: "tteokbokki-in-spicy-rose-sauce-dong-won",
      title: "Tteokbokki in Spicy Rose Sauce - Dong Won",
      description: "Sweet, spicy, tasty, convenient",
      tags: ["dong won", "tteokbokki", "korean food"],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      project: {
        connect: {
          id: project.id,
        },
      },
    },
  });

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
