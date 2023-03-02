// import { Storage } from "@google-cloud/storage";
// import fs from "fs";
// import { google } from "googleapis";

// import { prisma } from "../app/db.server";

export async function uploadYoutubeShort(
  contentSlug: string,
  projectId: string
) {
  const content = await prisma.content.findUnique({
    where: {
      slug: contentSlug,
      projectId,
    },
    include: {
      youtubeShortPost: true,
      project: {
        include: {
          user: {
            include: {
              youtubeCredentials: true,
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

  const contentMp4Filename = `${content.slug}-yt-short.mp4`;

  const storage = new Storage();

  storage
    .bucket(content.project.userId)
    .file(contentMp4Filename)
    .createReadStream()
    .pipe(fs.createWriteStream(contentMp4Filename))
    .on("finish", () => {});

  const yt = google.youtube({
    version: "v3",
    auth: authClient,
  });

  const insertedVideo = await yt.videos.insert({
    part: ["snippet", " status"],
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
      body: fs.createReadStream(contentMp4Filename),
    },
  });

  console.log(insertedVideo.data.status?.uploadStatus);
}
