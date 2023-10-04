import { v1 } from "@google-cloud/video-intelligence";
import cors from "cors";
import dotenv from "dotenv";
import type { Request } from "express";
import express, { json } from "express";

import { CloudIntelligenceTypes } from "./cloud-intelligence-types";
import type { GenerateTagsRequest } from "./functions/generate-tags";
import { generateTags } from "./functions/generate-tags";
import type { RecognizeTextRequest } from "./functions/recognize-text";
import { recognizeText } from "./functions/recognize-text";
import type { TranscribeRequest } from "./functions/transcribe";
import { transcribe } from "./functions/transcribe";
import { PrismaClient } from "./generated/index.js";
import { APP_BASE_URL } from "./utils/constants";

dotenv.config();

export const cloudIntelligence = new v1.VideoIntelligenceServiceClient();

export { CloudIntelligenceTypes };

export const prisma = new PrismaClient();

const app = express();

app.use(json());

app.use(
  cors({
    origin: APP_BASE_URL,
  })
);

app.post(
  "/generate-tags",
  async (req: Request<{}, {}, GenerateTagsRequest>, res) => {
    const { projectId, slug } = req.body;

    try {
      const { message } = await generateTags({
        projectId,
        slug,
        prisma,
      });

      res.status(200).json(message);
    } catch (error) {
      console.log(error);
      res.status(400).json(`Error generating tags for ${projectId} / ${slug}`);
    }
  }
);
app.post(
  "/recognize-text",
  async (req: Request<{}, {}, RecognizeTextRequest>, res) => {
    const { projectId, slug } = req.body;

    try {
      const { message } = await recognizeText({
        projectId,
        slug,
        prisma,
      });

      res.status(200).json(message);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send(`Error recognizing text for content ${projectId} / ${slug}`);
    }
  }
);
app.post(
  "/transcribe",
  async (req: Request<{}, {}, TranscribeRequest>, res) => {
    const { projectId, slug } = req.body;

    try {
      const { message } = await transcribe({
        projectId,
        slug,
        prisma,
      });

      res.status(200).send(message);
    } catch (error) {
      console.log(error);
      res.status(400).send(`Error transcribing content ${projectId} / ${slug}`);
    }
  }
);

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
