import { Storage } from "@google-cloud/storage";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import { PrismaClient } from "./generated/index.js";
import { uploadTikTok } from "./tiktok/upload-tiktok";
import { uploadTikTokStatus } from "./tiktok/upload-tiktok-status";
import { uploadContent } from "./upload-content";
import { APP_BASE_URL } from "./utils/constants";
import { uploadYouTubeShort } from "./youtube/upload-youtube-short.js";

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
app.post("/upload-tiktok", uploadTikTok);
app.post("/upload-youtube-short", uploadYouTubeShort);

app.get("/upload-tiktok-status", uploadTikTokStatus);

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
