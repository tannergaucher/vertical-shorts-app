import { path as ffmpeg } from "@ffmpeg-installer/ffmpeg";
import { Storage } from "@google-cloud/storage";
import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import express, { json } from "express";
import { createReadStream, createWriteStream } from "fs";
import { google } from "googleapis";

import { PrismaClient, UploadStatus } from "./generated/index.js";
import { APP_BASE_URL, UPLOAD_SERVICE_BASE_URL } from "./utils/constants";

dotenv.config();

const app = express();
app.use(json());

app.use(
  cors({
    origin: APP_BASE_URL,
  })
);

const prisma = new PrismaClient();

const storage = new Storage();

export interface UploadContentBody {
  slug: string;
  projectId: string;
}

app.post(
  "/upload-content",
  async (req: Request<{}, {}, UploadContentBody>, res: Response<string>) => {
    const { projectId, slug } = req.body;

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

    const filePath = `${slug}.mp4`;

    storage
      .bucket(projectId)
      .file(filePath)
      .createReadStream()
      .pipe(createWriteStream(filePath))
      .on("open", async () => {
        console.log("dl started");
        await prisma.content.update({
          where: {
            projectId_slug: {
              projectId,
              slug,
            },
          },
          data: {
            youtubeStatus: content.project.youtubeCredentials
              ? UploadStatus.INITIALIZING
              : undefined,
            tikTokStatus: content.project.tikTokCredentials
              ? UploadStatus.INITIALIZING
              : undefined,
          },
        });
      })
      .on("finish", () => {
        console.log("download finished");

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

        // res.status(200).send("Upload successful!");
      })
      .on("error", async (err) => {
        console.log(err);

        await prisma.content.update({
          where: {
            projectId_slug: {
              projectId,
              slug,
            },
          },
          data: {
            youtubeStatus: UploadStatus.NOT_STARTED,
            tikTokStatus: UploadStatus.NOT_STARTED,
          },
        });

        res.status(500).send("Something went wrong!");
      });
  }
);

app.post(
  "/upload-youtube-short",
  async (req: Request<{}, {}, UploadContentBody>, res: Response<string>) => {
    const { projectId, slug } = req.body;

    console.log("uploading to youtube", projectId, slug);

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
      access_token: project?.youtubeCredentials?.accessToken,
      refresh_token: project?.youtubeCredentials?.refreshToken,
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
            youtubeId: response.data.id,
          },
        });

        res.status(200).send("Video uploaded to youtube");
      })
      .catch(async (error) => {
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

        console.log("yt_error:", error);

        res.status(400).send("Error uploading video to youtube:");
      });
  }
);

app.post(
  "/upload-tiktok",
  async (req: Request<{}, {}, UploadContentBody>, res: Response<string>) => {
    const { projectId, slug } = req.body;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        tikTokCredentials: true,
      },
    });

    if (!project?.tikTokCredentials) {
      throw new Error("no tiktok credentials");
    }

    try {
      const initRes = await fetch(
        `https://open.tiktokapis.com/v2/post/publish/creator_info/query/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!initRes.ok) {
        throw new Error(
          `ERROR_INITIALIZING_TIKTOK_UPLOAD: ${initRes.statusText}}`
        );
      }

      const { data } = await initRes.json();

      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          tikTokStatus: UploadStatus.UPLOADING,
          tikTokId: data.publish_id,
        },
      });

      return res.status(200).send(data);
    } catch (error) {
      console.log(error, "error");
      return res.status(500).send("Error initializing tiktok upload");
    }
  }
);

interface UploadTikTokStatusQueryParams {
  publish_id: string;
  project_id: string;
}

app.get(
  "/upload-tiktok-status",
  async (
    req: Request<{}, {}, {}, UploadTikTokStatusQueryParams>,
    res: Response<string>
  ) => {
    const { publish_id, project_id } = req.query;

    const project = await prisma.project.findUnique({
      where: {
        id: project_id?.toString(),
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
          Authorization: `Bearer ${project?.tikTokCredentials?.accessToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          publish_id,
        }),
      }
    );

    if (!statusRes.ok) {
      const { status, statusText } = statusRes;

      res.status(status).send(statusText);
    }

    const statusResJson = await statusRes.json();

    res.status(200).send(statusResJson);
  }
);

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
