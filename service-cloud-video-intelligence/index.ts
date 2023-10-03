import { v1 } from "@google-cloud/video-intelligence";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import { CloudIntelligenceTypes } from "./cloud-intelligence-types";
import { generateTags } from "./functions/generate-tags";
import { recognizeText } from "./functions/recognize-text";
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

app.post("/generate-tags", generateTags);
app.post("/recognize-text", recognizeText);
app.post("/transcribe", transcribe);

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
