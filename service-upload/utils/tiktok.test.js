import { test, expect } from "vitest";
import { getTikTokVideoChunks, getTikTokRequestHeaders } from "./tiktok";

const MIN_CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
const MAX_CHUNK_SIZE = 64 * 1024 * 1024; // 64 MB in bytes
const MAX_FINAL_CHUNK_SIZE = 128 * 1024 * 1024; // 128 MB in bytes
const MB = 1024 * 1024; // 1 MB = 1024 * 1024 bytes

test("creates chunks from 111mb video and formats request headers for each chunk", async () => {
  const bufferSize = 111 * MB;

  const videoBinary = Buffer.allocUnsafe(bufferSize);
  const videoSize = videoBinary.length;
  const totalChunkCount = Math.ceil(videoSize / MAX_CHUNK_SIZE);
  const chunkSize = Math.floor(videoSize / totalChunkCount);

  const videoChunks = getTikTokVideoChunks({
    videoSize,
    videoBinary,
    minChunkSize: MIN_CHUNK_SIZE,
    maxChunkSize: MAX_CHUNK_SIZE,
    maxFinalChunkSize: MAX_FINAL_CHUNK_SIZE,
    totalChunkCount,
    chunkSize,
  });

  console.log("videoChunks", videoChunks);
  expect(videoChunks.length).toBe(2);

  videoChunks.forEach((chunk, index) => {
    const headers = getTikTokRequestHeaders({
      chunk,
      index,
      chunkSize,
      totalChunkCount,
      videoSize,
    });

    // todo test
    console.log("_headers", headers);
  });
});

test("creates chunks from 150mb video and formats request headers", async () => {
  const bufferSize = 151 * MB;

  const videoBinary = Buffer.allocUnsafe(bufferSize);
  const videoSize = videoBinary.length;
  const totalChunkCount = Math.ceil(videoSize / MAX_CHUNK_SIZE);
  const chunkSize = Math.floor(videoSize / totalChunkCount);

  const videoChunks = getTikTokVideoChunks({
    videoSize,
    videoBinary,
    minChunkSize: MIN_CHUNK_SIZE,
    maxChunkSize: MAX_CHUNK_SIZE,
    maxFinalChunkSize: MAX_FINAL_CHUNK_SIZE,
    totalChunkCount,
    chunkSize,
  });

  console.log("videoChunks", videoChunks);
  expect(videoChunks.length).toBe(3);

  videoChunks.forEach((chunk, index) => {
    const headers = getTikTokRequestHeaders({
      chunk,
      index,
      chunkSize,
      totalChunkCount,
      videoSize,
    });

    console.log("_headers", headers);
  });
});
