import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "seed@remix.run";

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      select: {
        id: true,
      },
    });

    projects.forEach(async (project) => {
      await prisma.content.deleteMany({
        where: { projectId: project.id },
      });

      await prisma.project.delete({
        where: { id: project.id },
      });
    });

    await prisma.user.delete({ where: { email } }).catch((e) => {});
  }

  const hashedPassword = await bcrypt.hash("mypassword123", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      projects: {
        create: {
          title: "My Seed Project",
          tags: ["seed-project-tag"],
          // eventually create good seed content with gifs
          content: {
            create: {
              slug: "seed-slug",
              title: "Seed Content Title",
            },
          },
          youtubeCredentials: {
            create: {
              accessToken: "seed-access-token",
              refreshToken: "seed-refresh-token",
              channelId: "seed-channel-id",
            },
          },
          tikTokCredentials: {
            create: {
              handle: "seed-handle",
              accessToken: "seed-access-token",
              refreshToken: "seed-refresh-token",
              refreshTokenExpiresIn: 1000,
              scope: "123,scope",
              openId: "seed-open-id",
            },
          },
        },
      },
    },
  });

  console.log(user);

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
