const express = require("express");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const { google } = require("googleapis");
require("dotenv").config();

const { PrismaClient, UploadStatus } = require("./generated");
const { UPLOAD_SERVICE_BASE_URL } = require("./utils/constants");

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const storage = new Storage();

app.post("/upload", async (req, res) => {
  console.log("getting file");
  const { projectId, slug } = req.body;

  const content = await prisma.content.findUniqueOrThrow({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      projectId: true,
      slug: true,
      project: {
        select: {
          youtubeCredentials: true,
          tikTokCredentials: true,
        },
      },
    },
  });

  console.log(content, "content");

  const filePath = `${content.slug}.mp4`;

  storage
    .bucket(content.projectId)
    .file(filePath)
    .createReadStream()
    .pipe(fs.createWriteStream(filePath))
    .on("open", () => {
      res.send("dl started");
    })
    .on("finish", () => {
      console.log("dl finished");
      if (content.project.youtubeCredentials) {
        fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-youtube-short`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            slug,
          }),
        });
      }

      if (content.project.tikTokCredentials) {
        console.log("todo call tiktok endpoint");
      }
    })
    .on("error", (err) => {
      console.log(err);
      res.status(500).send("Something went wrong!");
    });
});

app.post("/upload-youtube-short", async (req, res) => {
  const { projectId, slug } = req.body;

  const content = await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      title: true,
      description: true,
      tags: true,
    },
    data: {
      youtubeStatus: UploadStatus.UPLOADING,
    },
  });

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URL
  );

  oauth2Client.setCredentials({
    access_token: project.youtubeCredentials.accessToken,
    refresh_token: project.youtubeCredentials.refreshToken,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  const filePath = `${req.body.slug}.mp4`;
  const bodyStream = fs.createReadStream(filePath);

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
    .then(async (response) => {
      console.log(response, "yt_response");

      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          youtubeStatus: UploadStatus.UPLOADING,
        },
      });

      res.send("Video uploaded to youtube");
    })
    .catch(async (error) => {
      console.log(error, "yt_error");

      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          youtubeStatus: UploadStatus.NOT_STARTED,
        },
      });
    });
});

const port = parseInt(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
