export const CLOUD_VIDEO_INTELLIGENCE_SERVICE_BASE_URL =
  process.env.NODE_ENV === "production" ? `todo:fix` : `http://localhost:8080`;

export const APP_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://verticalshorts.app`
    : `http://localhost:3000`;
