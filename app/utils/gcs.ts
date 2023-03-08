import type { Storage } from "@google-cloud/storage";
import fs from "fs";

export function getGcsImageSrc({
  bucket,
  file,
}: {
  bucket: string;
  file: string;
}) {
  return `https://storage.googleapis.com/${bucket}/${file}`;
}

export function getGcsVideoSrc({
  bucket,
  file,
}: {
  bucket: string;
  file: string;
}) {
  return `https://storage.googleapis.com/${bucket}/${file}`;
}

export async function uploadGcsFile(params: {
  storage: Storage;
  bucket: string;
  file: string;
  path: string;
}) {
  try {
    const { bucket, file, path, storage } = params;

    const options = {
      destination: file,
      public: true,
    };

    await storage.bucket(bucket).upload(path, options);

    console.log(`${file} uploaded to ${bucket}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading thumbnail to GCS");
  }
}

export function createYoutubeVideoFilename({ file }: { file: string }) {
  return `${file}-yt-short.mp4`;
}

export async function downloadGcsFileToMemory(params: {
  storage: Storage;
  bucket: string;
  file: string;
  path: string;
}) {
  try {
    const { storage, bucket, file, path } = params;

    storage
      .bucket(bucket)
      .file(file)
      .createReadStream()
      .pipe(fs.createWriteStream(path))
      .on("finish", () => {
        console.log(`Downloaded ${file} to ${path}`);
      });
  } catch (error) {
    console.log(error, "error");
    throw new Error("ERROR_DOWNLOADING_VIDEO");
  }
}
