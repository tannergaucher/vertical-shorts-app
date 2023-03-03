import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { google } from "googleapis";
import * as Storage from "@google-cloud/storage";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

const storage = new Storage.Storage();

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

    const VIDEO_FILE_PATH = `${content.slug}-yt-short.mp4`;

    storage
      .bucket(content.project.user.id)
      .file(VIDEO_FILE_PATH)
      .createReadStream()
      .pipe(fs.createWriteStream(VIDEO_FILE_PATH))
      .on("finish", () => {
        console.log("finished downloading video");
      });

    const user = await prisma.user.findUnique({
      where: {
        id: content.project.user.id,
      },
      select: {
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

    if (!user.youtubeCredentials?.accessToken) {
      throw new Error("NO_YOUTUBE_ACCESS_TOKEN");
    }

    if (!user.youtubeCredentials?.refreshToken) {
      throw new Error("NO_YOUTUBE_REFRESH_TOKEN");
    }

    // use service account to upload video
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
          body: fs.createReadStream(VIDEO_FILE_PATH),
        },
      },

      {
        // Use the `onUploadProgress` event from Axios to track the
        // number of bytes uploaded to this point.
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / evt.contentLength) * 100;
          console.log(`${Math.round(progress)}% complete`);
        },
      }
    );
  } catch (error) {
    console.log(error, "error");
    throw new Error("ERROR_UPLOADING_YOUTUBE_VIDEO");
  }
}

uploadYoutubeVideo({
  slug: "function-test",
  projectId: "cleo5p6rd00019gxqsgtxiej9",
});
