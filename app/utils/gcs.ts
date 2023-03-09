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

export function createYoutubeVideoFilename({ file }: { file: string }) {
  return `${file}-yt-short.mp4`;
}
