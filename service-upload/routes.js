"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUploadRoutes = void 0;
const constants_1 = require("./utils/constants");
exports.ServiceUploadRoutes = {
    InitializeUpload: `${constants_1.SERVICE_UPLOAD_BASE_URL}/initialize-upload`,
    UploadTiktok: `${constants_1.SERVICE_UPLOAD_BASE_URL}/upload-tiktok`,
    UploadTiktokStatus: `${constants_1.SERVICE_UPLOAD_BASE_URL}/upload-tiktok-status`,
    UploadYoutubeShort: `${constants_1.SERVICE_UPLOAD_BASE_URL}/upload-youtube-short`,
};
