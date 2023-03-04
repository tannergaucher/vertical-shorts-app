import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";
import { google } from "googleapis";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

const storage = new Storage();

functions.cloudEvent("upload-youtube-video", async (cloudEvent) => {
  await uploadYoutubeVideo({
    slug: "cloudEvent.data.slug",
    projectId: "cloudEvent.data.projectId",
  });

  return { message: "success" };
});

async function uploadYoutubeVideo(params: { slug: string; projectId: string }) {
  try {
    const { slug, projectId } = params;

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

    const user = await prisma.user.findUnique({
      where: {
        id: content.project.user.id,
      },
      select: {
        id: true,
        currentProjectId: true,
        youtubeCredentials: {
          select: {
            accessToken: true,
            refreshToken: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("NO_USER");
    }

    if (!user.currentProjectId) {
      throw new Error("MISSING_CURRENT_PROJECT");
    }

    if (
      !user.youtubeCredentials?.accessToken ||
      !user.youtubeCredentials?.refreshToken
    ) {
      throw new Error("MISSING_YOUTUBE_CREDENTIALS");
    }

    const videoFilePath = `${content.slug}-yt-short.mp4`;

    // download video from GCS to local file system
    await getVideostreamFromGCS({
      storage,
      bucket: user.currentProjectId,
      videoFilePath,
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URL
    );

    oauth2Client.setCredentials({
      access_token: user.youtubeCredentials.accessToken,
      refresh_token: user.youtubeCredentials.refreshToken,
    });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    await youtube.videos.insert(
      {
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
          body: fs.createReadStream(videoFilePath),
        },
      },
      {
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / evt.contentLength) * 100;
          console.log(`${Math.round(progress)}% complete`);
        },
      }
    );

    // remove video from local file system
    fs.unlinkSync(videoFilePath);
  } catch (error) {
    console.log(error, "error");
    throw new Error("ERROR_UPLOADING_YOUTUBE_VIDEO");
  }
}

async function getVideostreamFromGCS(params: {
  storage: Storage;
  bucket: string;
  videoFilePath: string;
}) {
  try {
    storage
      .bucket(params.bucket)
      .file(params.videoFilePath)
      .createReadStream()
      .pipe(fs.createWriteStream(params.videoFilePath))
      .on("finish", () => {});
  } catch (error) {
    console.log(error, "error");
    throw new Error("ERROR_DOWNLOADING_VIDEO");
  }
}

uploadYoutubeVideo({
  slug: "function-test",
  projectId: "cleo5p6rd00019gxqsgtxiej9",
});
