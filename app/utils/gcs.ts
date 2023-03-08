import type { Storage } from "@google-cloud/storage";
import fs from "fs";

export function getGcsImageSrc({
  bucket,
  filename,
}: {
  bucket: string;
  filename: string;
}) {
  return `https://storage.googleapis.com/${bucket}/${filename}`;
}

export function getGcsVideoSrc({
  bucket,
  filename,
}: {
  bucket: string;
  filename: string;
}) {
  return `https://storage.googleapis.com/${bucket}/${filename}`;
}

export async function uploadGcsFile(params: {
  storage: Storage;
  bucket: string;
  filePath: string;
  destFileName: string;
}) {
  try {
    const { bucket, filePath, destFileName, storage } = params;

    const options = {
      destination: destFileName,
      public: true,
    };

    await storage.bucket(bucket).upload(filePath, options);

    console.log(`${destFileName} uploaded to ${bucket}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading thumbnail to GCS");
  }
}

export function createYoutubeVideoFilename({ slug }: { slug: string }) {
  return `${slug}-yt-short.mp4`;
}

export async function downloadGcsVideoToLocalMemory(params: {
  storage: Storage;
  bucket: string;
  slug: string;
}) {
  try {
    const path = `${params.slug}.mp4`;

    params.storage
      .bucket(params.bucket)
      .file(`${params.slug}.mp4`)
      .createReadStream()
      .pipe(fs.createWriteStream(path))
      .on("finish", () => {
        return path;
      });

    return `${params.slug}.mp4`;
  } catch (error) {
    console.log(error, "error");
    throw new Error("ERROR_DOWNLOADING_VIDEO");
  }
}
