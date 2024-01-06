import { Storage } from "@google-cloud/storage";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";

import {
  initializeUpload,
  type InitializeUploadBody,
} from "./functions/initialize-upload";
import { uploadTikTok, type UploadTikTokBody } from "./functions/upload-tiktok";
import {
  uploadTikTokStatus,
  type UploadTikTokStatusQueryParams,
} from "./functions/upload-tiktok-status";
import {
  uploadYouTubeShort,
  type UploadYoutubeShortBody,
} from "./functions/upload-youtube-short";
import { PrismaClient } from "./generated/index.js";
import { ServiceUploadRoutes } from "./routes";
import { APP_BASE_URL } from "./utils/constants";

dotenv.config();

export const prisma = new PrismaClient();

export const storage = new Storage();

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: APP_BASE_URL,
  })
);

app.post(
  ServiceUploadRoutes.InitializeUpload,
  async (req: Request<{}, {}, InitializeUploadBody>, res: Response) => {
    const { projectId, contentId } = req.body;

    try {
      const { message } = await initializeUpload({
        projectId,
        contentId,
        prisma,
        storage,
      });

      res.status(200).send(message);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send(`Error initializing upload ${projectId} ${contentId}`);
    }
  }
);

app.post(
  ServiceUploadRoutes.UploadTiktok,
  async (req: Request<{}, {}, UploadTikTokBody>, res: Response) => {
    const { contentId } = req.body;

    try {
      const { message } = await uploadTikTok({
        contentId,
        prisma,
      });

      res.status(200).send(message);
    } catch (error) {
      console.log(error);
      res.status(400).send(`Error uploading ${contentId} to TikTok`);
    }
  }
);

app.post(
  ServiceUploadRoutes.UploadYoutubeShort,
  async (req: Request<{}, {}, UploadYoutubeShortBody>, res) => {
    const { contentId } = req.body;
    try {
      const { message } = await uploadYouTubeShort({
        contentId,
        prisma,
      });

      res.status(200).send(message);
    } catch (error) {
      console.log(error);
      res.status(400).send(`Error uploading ${contentId} YouTube Short`);
    }
  }
);

app.get(
  ServiceUploadRoutes.UploadTiktokStatus,
  async (req: Request<{}, {}, {}, UploadTikTokStatusQueryParams>, res) => {
    const { project_id, publish_id } = req.query;

    try {
      const { message } = await uploadTikTokStatus({
        projectId: project_id,
        publishId: publish_id,
        prisma,
      });

      res.status(200).json(message);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json(
          `Error getting upload status for TikTok publish_id ${publish_id}`
        );
    }
  }
);

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
