import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { google } from "googleapis";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

functions.cloudEvent("upload-youtube-video", async (cloudEvent) => {
  await uploadYoutubeVideo({
    slug: "cloudEvent.data.slug",
    projectId: "cloudEvent.data.projectId",
  });

  return { message: "success" };
});

export async function uploadYoutubeVideo(params: {
  slug: string;
  projectId: string;
}) {
  const { slug, projectId } = params;

  try {
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
            user: {
              select: {
                id: true,
                youtubeCredentials: {
                  select: {
                    channelId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!content) {
      throw new Error("NO_CONTENT");
    }

    if (!content.project.user.youtubeCredentials?.channelId) {
      throw new Error("NO_YT_CHANNEL_ID");
    }

    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/youtube.upload"],
    });

    const authClient = await auth.getClient();

    const videoFilename = `${content.slug}-yt-short.mp4`;

    const storage = new Storage();

    storage
      .bucket(content.project.user.id)
      .file(videoFilename)
      .createReadStream()
      .pipe(fs.createWriteStream(videoFilename))
      .on("finish", () => {
        console.log("finished downloading video");
      });

    const yt = google.youtube({
      version: "v3",
      auth: authClient,
    });

    await yt.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: content.title,
          description: content.description,
          tags: content.tags,
          channelId: content.project.user.youtubeCredentials.channelId,
        },
        status: {
          privacyStatus: content.published ? "public" : "private",
        },
      },
      media: {
        body: fs.createReadStream(videoFilename),
      },
    });
  } catch (error) {
    console.log(error, "error");
    throw new Error("ERROR_UPLOADING_YT_VIDEO");
  }
}
