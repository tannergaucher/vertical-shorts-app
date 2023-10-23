"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_BASE_URL = exports.SERVICE_UPLOAD_BASE_URL = void 0;
exports.SERVICE_UPLOAD_BASE_URL = process.env.NODE_ENV === "production"
    ? `https://service-upload-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;
exports.APP_BASE_URL = process.env.NODE_ENV === "production"
    ? `https://verticalshorts.app`
    : `http://localhost:3000`;
