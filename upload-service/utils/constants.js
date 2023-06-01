const UPLOAD_SERVICE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://upload-service-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;

module.exports = {
  UPLOAD_SERVICE_BASE_URL,
};
