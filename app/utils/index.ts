export function getGcsImageSrc(bucket: string, filename: string, size: number) {
  return `https://storage.googleapis.com/${bucket}/${filename}?${size}`;
}
