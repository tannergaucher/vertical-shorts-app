import { ChannelType, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "testseed@remix.run";

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
    });

    projects.forEach(async (project) => {
      await prisma.content
        .deleteMany({
          where: {
            projectId: project.id,
          },
        })
        .catch(() => {});

      await prisma.channel
        .deleteMany({
          where: {
            projectId: project.id,
          },
        })
        .catch(() => {});
    });

    await prisma.project
      .deleteMany({
        where: {
          userId: user.id,
        },
      })
      .catch(() => {});

    await prisma.user.delete({ where: { email } }).catch(() => {});
  }

  const hashedPassword = await bcrypt.hash("test123", 10);

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
          title: "Seed project",
          tags: ["seed-tag"],
          content: {
            create: {
              slug: "seed-content-slug",
              title: "Seed Content Title",
            },
          },
          tikTokCredentials: {
            create: {
              handle: "seed handle",
              accessToken: "seed-tiktok-access-token",
              refreshToken: "seed-tiktok-refresh-token",
              refreshTokenExpiresIn: 123,
              scope: "seed,scope",
              openId: "abc123",
            },
          },
          youtubeCredentials: {
            create: {
              accessToken: "123sdf",
              refreshToken: "123asd",
              userId: "yt-user-id",
            },
          },
          channels: {
            createMany: {
              data: [
                {
                  name: "Seed Tiktok Channel",
                  channelType: ChannelType.TIKTOK,
                },
                {
                  name: "Seed Youtube Channel",
                  channelType: ChannelType.YOUTUBE,
                },
              ],
            },
          },
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
