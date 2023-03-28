import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";
import { google } from "googleapis";

import { PrismaClient } from "./generated";

export type UploadVideoEvent = {
  slug: string;
  projectId: string;
};

const prisma = new PrismaClient();

const storage = new Storage();

functions.cloudEvent("upload-youtube-short", async (cloudEvent) => {
  await uploadYoutubeShort(cloudEvent);

  return { message: "success" };
});

export async function uploadYoutubeShort(cloudEvent: any) {
  const parsedData = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as UploadVideoEvent;

  const { slug, projectId } = parsedData;

  const content = await prisma.content.findUnique({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      slug: true,
      title: true,
      description: true,
      tags: true,
      published: true,
      project: {
        select: {
          id: true,
          youtubeCredentials: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!content) {
    throw new Error("NO_CONTENT");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: content.project.user.id,
    },
    select: {
      id: true,
      currentProjectId: true,
    },
  });

  if (!user) {
    throw new Error("NO_USER");
  }

  if (!user.currentProjectId) {
    throw new Error("NO_CURRENT_PROJECT");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URL
  );

  const currentProject = await prisma.project.findUnique({
    where: {
      id: user.currentProjectId,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  console.log(currentProject, "CURRENT PROJECT");

  if (!currentProject?.youtubeCredentials) {
    throw new Error("NO_YOUTUBE_CREDENTIALS");
  }

  oauth2Client.setCredentials({
    access_token: currentProject.youtubeCredentials.accessToken,
  });

  const videoFilePath = `${content.slug}.mp4`;

  try {
    storage
      .bucket(user.currentProjectId)
      .file(videoFilePath)
      .createReadStream()
      .pipe(fs.createWriteStream(videoFilePath))
      .on("finish", () => {
        const bodyStream = fs.createReadStream(videoFilePath);

        const youtube = google.youtube({
          version: "v3",
          auth: oauth2Client,
        });

        youtube.videos
          .insert({
            part: ["snippet", "status"],
            requestBody: {
              snippet: {
                title: content.title,
                description: content.description,
                tags: content.tags,
              },
              status: {
                privacyStatus: "private",
              },
            },
            media: {
              mimeType: "video/mp4",
              body: bodyStream,
            },
          })
          .finally(() => {
            fs.unlinkSync(videoFilePath);
          });
      });
  } catch (error) {
    console.log("AUTH ERR, HANDLING REFRESH TOKEN", error);

    if (error instanceof google.auth.GoogleAuth) {
      oauth2Client.setCredentials({
        refresh_token: currentProject.youtubeCredentials.refreshToken,
      });

      const { token } = await oauth2Client.getAccessToken();

      if (token) {
        oauth2Client.setCredentials({
          access_token: token,
          refresh_token: currentProject.youtubeCredentials.refreshToken,
        });
      }

      storage
        .bucket(user.currentProjectId)
        .file(videoFilePath)
        .createReadStream()
        .pipe(fs.createWriteStream(videoFilePath))
        .on("finish", () => {
          const bodyStream = fs.createReadStream(videoFilePath);

          const youtube = google.youtube({
            version: "v3",
            auth: oauth2Client,
          });

          youtube.videos
            .insert({
              part: ["snippet", "status"],
              requestBody: {
                snippet: {
                  title: content.title,
                  description: content.description,
                  tags: content.tags,
                },
                status: {
                  privacyStatus: "private",
                },
              },
              media: {
                mimeType: "video/mp4",
                body: bodyStream,
              },
            })
            .finally(() => {
              fs.unlinkSync(videoFilePath);
            });
        });
    }
  }
}
