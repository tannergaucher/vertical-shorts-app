"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_BASE_URL = exports.CLOUD_VIDEO_INTELLIGENCE_SERVICE_BASE_URL = void 0;
exports.CLOUD_VIDEO_INTELLIGENCE_SERVICE_BASE_URL = process.env.NODE_ENV === "production" ? `todo:fix` : `http://localhost:8080`;
exports.APP_BASE_URL = process.env.NODE_ENV === "production"
    ? `https://verticalshorts.app`
    : `http://localhost:3000`;
