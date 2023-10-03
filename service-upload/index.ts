import { Storage } from "@google-cloud/storage";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import { uploadContent } from "./functions/upload-content";
import { uploadTikTok } from "./functions/upload-tiktok";
import { uploadTikTokStatus } from "./functions/upload-tiktok-status";
import { uploadYouTubeShort } from "./functions/upload-youtube-short";
import { PrismaClient } from "./generated/index.js";
import { APP_BASE_URL } from "./utils/constants";

dotenv.config();

const app = express();
app.use(json());

app.use(
  cors({
    origin: APP_BASE_URL,
  })
);

export const prisma = new PrismaClient();

export const storage = new Storage();

app.post("/upload-content", (req, res) =>
  uploadContent(req, res, prisma, storage)
);
app.post("/upload-tiktok", (req, res) => uploadTikTok(req, res, prisma));
app.post("/upload-youtube-short", (req, res) =>
  uploadYouTubeShort(req, res, prisma)
);
app.get("/upload-tiktok-status", (req, res) =>
  uploadTikTokStatus(req, res, prisma)
);

if (!process.env.PORT) {
  throw new Error("PORT environment variable not set");
}

const port = parseInt(process.env.PORT);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
