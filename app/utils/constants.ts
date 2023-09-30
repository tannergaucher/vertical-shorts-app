import { ChannelType } from "@prisma/client";

export const UPLOAD_SERVICE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://service-upload-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;

export const CLOUD_VIDEO_INTELLIGENCE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://service-cloud-video-intelligence-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;

export const SUPPORTED_CHANNELS: ChannelType[] = [
  ChannelType.YOUTUBE,
  ChannelType.TIKTOK,
  // ChannelType.INSTAGRAM,
  // ChannelType.TWITTER,
  // ChannelType.FACEBOOK,
];
