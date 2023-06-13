import { path as ffmpeg } from "@ffmpeg-installer/ffmpeg";
import { Storage } from "@google-cloud/storage";
import { exec } from "child_process";
import dotenv from "dotenv";
import express, { json } from "express";
import { createReadStream, createWriteStream, statSync } from "fs";
import { google } from "googleapis";
import path from "path";

import { PrismaClient, UploadStatus } from "./generated/index.js";
import { APP_BASE_URL, UPLOAD_SERVICE_BASE_URL } from "./utils/constants.js";

dotenv.config();

const app = express();
app.use(json());

const prisma = new PrismaClient();

const storage = new Storage();

app.post("/upload", async (req, res) => {
  console.log("getting file");
  const { projectId, slug } = req.body;

  console.log(projectId, "projectId", slug, "slug");

  const content = await prisma.content.findUniqueOrThrow({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      project: {
        select: {
          youtubeCredentials: true,
          tikTokCredentials: true,
        },
      },
    },
  });

  console.log(content, "content");

  const filePath = `${slug}.mp4`;

  try {
    storage
      .bucket(projectId)
      .file(filePath)
      .createReadStream()
      .pipe(createWriteStream(filePath))
      .on("open", () => {
        res.send("dl started");
      })
      .on("finish", () => {
        console.log("dl finished");

        exec(
          `${ffmpeg} -i ${filePath} -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${slug}.gif`,

          async (error) => {
            if (error) {
              console.log("error creating gif", error);
            } else {
              console.log("gif created");

              await storage
                .bucket(projectId)
                .upload(`${slug}.gif`)
                .then(async () => {
                  await prisma.content.update({
                    where: {
                      projectId_slug: {
                        projectId,
                        slug,
                      },
                    },
                    data: {
                      gif: `https://storage.googleapis.com/${projectId}/${slug}.gif`,
                    },
                  });
                });
            }
          }
        );

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
          fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-tiktok`, {
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
      })
      .on("error", (err) => {
        console.log(err);
        res.status(500).send("Something went wrong!");
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error downloading file");
  }
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
  const bodyStream = createReadStream(filePath);

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
          youtubeStatus: UploadStatus.PRIVATE,
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

app.post("/upload-tiktok", async (req, res) => {
  const { projectId, slug } = req.body;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  if (!project.tikTokCredentials) {
    throw new Error("no tiktok credentials");
  }

  try {
    const initRes = await fetch(
      `https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
          "Content-Type": "application/json;",
        },
        body: JSON.stringify({
          source: "PULL_FROM_URL",
          video_url: `${APP_BASE_URL}/resource/serve-video/${slug}`, // "https://sf16-va.tiktokcdn.com/obj/eden-va2/uvpapzpbxjH-aulauvJ-WV[[/ljhwZthlaukjlkulzlp/3min.mp4",
        }),
      }
    );

    if (!initRes.ok) {
      console.log(initRes, "initRes.error");
      throw new Error("ERROR_INITIALIZING_TIKTOK_UPLOAD");
    }

    const { data } = await initRes.json();

    return res.send(data);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).send("Error initializing tiktok upload");
  }
});

app.get(`/serve-video`, async (req, res) => {
  const { slug } = req.query;

  const __dirname = path.resolve();

  const filePath = path.join(__dirname, `${slug}.mp4`);
  const fileSizeInBytes = statSync(filePath).size;

  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Content-Length", fileSizeInBytes);
  res.setHeader("Content-Disposition", "inline");

  res.sendFile(filePath);
});

app.get("/tiktok-upload-status", async (req, res) => {
  const { publish_id, project_id } = req.query;

  const project = await prisma.project.findUnique({
    where: {
      id: project_id,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  const statusRes = await fetch(
    "https://open.tiktokapis.com/v2/post/publish/status/fetch/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        publish_id,
      }),
    }
  );

  if (!statusRes.ok) {
    const { status, statusText } = statusRes;
    console.log(status, "status");
    console.log(statusText, "statusText");
    throw new Error("ERROR_GETTING_TIKTOK_UPLOAD_STATUS");
  }

  const statusResJson = await statusRes.json();
  res.send(statusResJson);
});

const port = parseInt(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
