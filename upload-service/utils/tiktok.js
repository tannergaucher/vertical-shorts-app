function getTikTokVideoChunks({
  videoSize,
  videoBinary,
  minChunkSize,
  maxFinalChunkSize,
  totalChunkCount,
  chunkSize,
}) {
  if (videoSize < minChunkSize) {
    // Upload the entire video as a single chunk
    return [videoBinary];
  }

  const chunks = [];
  let remainingBytes = videoSize;
  let offset = 0;

  for (let i = 0; i < totalChunkCount; i++) {
    let currentChunkSize = chunkSize;

    if (i === totalChunkCount - 1) {
      // Last chunk can be greater to accommodate any trailing bytes
      currentChunkSize = Math.min(remainingBytes, maxFinalChunkSize);
    }

    const chunk = videoBinary.slice(offset, offset + currentChunkSize);
    chunks.push(chunk);

    offset += currentChunkSize;
    remainingBytes -= currentChunkSize;
  }

  return chunks;
}

function getTikTokRequestHeaders({
  chunk,
  index,
  chunkSize,
  totalChunkCount,
  videoSize,
}) {
  const firstByte = index * chunkSize;
  const lastByte =
    index === totalChunkCount - 1
      ? Math.min(firstByte + chunk.length - 1, videoSize - 1)
      : Math.min(firstByte + chunkSize - 1, videoSize - 1);

  const headers = {
    "Content-Type": "video/mp4",
    "Content-Length": chunk.length,
    "Content-Range": `bytes ${firstByte}-${lastByte}/${videoSize}`,
  };

  return headers;
}

module.exports = {
  getTikTokVideoChunks,
  getTikTokRequestHeaders,
};
