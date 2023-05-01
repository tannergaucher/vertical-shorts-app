export function getGcsImageSrc({
  projectId,
  contentSlug,
}: {
  projectId: string;
  contentSlug: string;
}) {
  return `https://storage.googleapis.com/${projectId}/${contentSlug}`;
}

export function getGcsVideoSrc({
  projectId,
  contentSlug,
}: {
  projectId: string;
  contentSlug: string;
}) {
  return `https://storage.googleapis.com/${projectId}/${contentSlug}`;
}

export function createYoutubeVideoFilename({ file }: { file: string }) {
  return `${file}-yt-short.mp4`;
}
