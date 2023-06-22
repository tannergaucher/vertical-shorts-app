export const UPLOAD_SERVICE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://service-upload-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;
