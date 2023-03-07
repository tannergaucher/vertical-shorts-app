import type { Storage } from "@google-cloud/storage";

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
