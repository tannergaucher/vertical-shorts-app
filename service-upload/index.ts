import { Storage } from "@google-cloud/storage";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import { PrismaClient } from "./generated/index.js";
import { uploadContent } from "./upload-content";
import { uploadTikTokContent } from "./upload-tiktok.js";
import { uploadTikTokStatus } from "./upload-tiktok-status";
import { uploadYouTubeShort } from "./upload-youtube-short";
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

app.post("/upload-content", uploadContent);
app.post("/upload-tiktok", uploadTikTokContent);
app.post("/upload-youtube-short", uploadYouTubeShort);

app.get("/upload-tiktok-status", uploadTikTokStatus);

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
