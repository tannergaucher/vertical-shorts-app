export const UPLOAD_SERVICE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://service-upload-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;

export const CLOUD_VIDEO_INTELLIGENCE_BASE_URL =
  process.env.NODE_ENV === "production" ? `` : `http://localhost:8080`;
