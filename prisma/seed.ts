import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      password: {
        create: {
          hash: "password123",
        },
      },
      projects: {
        create: [
          {
            title: "My first project",
            tags: ["tag1", "tag2"],
            content: {
              create: [
                {
                  slug: "content-1",
                  title: "My first content",
                  description: "This is my first content",
                  thumbnail: "https://example.com/thumbnail1.jpg",
                  gif: "https://example.com/gif1.gif",
                  tags: ["tag1", "tag2"],
                  youtubeId: "youtube-id-1",
                  youtubeStatus: "PRIVATE",
                  youtubePublishAt: new Date(),
                  tikTokId: "tiktok-id-1",
                  tikTokStatus: "PRIVATE",
                  tikTokPublishAt: new Date(),
                  instagramId: "instagram-id-1",
                  instagramStatus: "PRIVATE",
                  instagramPublishAt: new Date(),
                  facebookId: "facebook-id-1",
                  facebookStatus: "PRIVATE",
                  facebookPublishAt: new Date(),
                  twitterId: "twitter-id-1",
                  twitterStatus: "PRIVATE",
                  twitterPublishAt: new Date(),
                  annotations: {
                    key1: "value1",
                    key2: "value2",
                  },
                  labels: {
                    key1: "value1",
                    key2: "value2",
                  },
                  transcription: {
                    key1: "value1",
                    key2: "value2",
                  },
                  textDetection: {
                    key1: "value1",
                    key2: "value2",
                  },
                },
              ],
            },
            channels: {
              create: [
                {
                  name: "My YouTube Channel",
                  views: 1000,
                  subscribers: 500,
                  thumbnail: "https://example.com/thumbnail1.jpg",
                  channelType: "YOUTUBE",
                },
                {
                  name: "My Instagram Channel",
                  views: 2000,
                  subscribers: 1000,
                  thumbnail: "https://example.com/thumbnail2.jpg",
                  channelType: "INSTAGRAM",
                },
              ],
            },
            youtubeCredentials: {
              create: {
                accessToken: "access-token-1",
                refreshToken: "refresh-token-1",
                channelId: "channel-id-1",
              },
            },
            instagramCredentials: {
              create: {
                accessToken: "access-token-1",
                username: "username-1",
              },
            },
            tikTokCredentials: {
              create: {
                accessToken: "access-token-1",
                refreshToken: "refresh-token-1",
                refreshTokenExpiresIn: 3600,
                scope: "scope-1",
                openId: "open-id-1",
                handle: "handle-1",
              },
            },
            facebookCredentials: {
              create: {
                pageId: "page-id-1",
              },
            },
            twitterCredentials: {
              create: {},
            },
          },
        ],
      },
    },
    include: {
      projects: {
        include: {
          content: true,
          channels: true,
          youtubeCredentials: true,
          instagramCredentials: true,
          tikTokCredentials: true,
          facebookCredentials: true,
          twitterCredentials: true,
        },
      },
    },
  });

  console.log(`Created users: ${user1.email}`);

  console.log("Seeding finished.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
