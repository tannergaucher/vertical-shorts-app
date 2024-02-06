import { ChannelType, PlanType, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.development`,
});

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function seed() {
  await prisma.content.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      planType: PlanType.STARTER,
      password: {
        create: {
          hash: await bcrypt.hash("test@123", 10),
        },
      },
    },
  });

  // Create a project associated with the user
  const project = await prisma.project.create({
    data: {
      title: "My First Project",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  // Create channels associated with the project
  await prisma.channel.create({
    data: {
      name: "My First Youtube Channel",
      channelType: ChannelType.YOUTUBE,
      project: {
        connect: {
          id: project.id,
        },
      },
    },
  });

  // Create content associated with the project
  await prisma.content.create({
    data: {
      id: "1",
      title: "My first video",
      description: "This is my first video",
      project: {
        connect: {
          id: project.id,
        },
      },
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
