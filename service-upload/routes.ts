import { SERVICE_UPLOAD_BASE_URL } from "./utils/constants";

export const ServiceUploadRoutes = {
  InitializeUpload: `${SERVICE_UPLOAD_BASE_URL}/initialize-upload`,
  UploadTiktok: `${SERVICE_UPLOAD_BASE_URL}/upload-tiktok`,
  UploadTiktokStatus: `${SERVICE_UPLOAD_BASE_URL}/upload-tiktok-status`,
  UploadYoutubeShort: `${SERVICE_UPLOAD_BASE_URL}/upload-youtube-short`,
};
