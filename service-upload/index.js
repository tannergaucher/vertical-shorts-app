"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.prisma = void 0;
const storage_1 = require("@google-cloud/storage");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const upload_content_1 = require("./functions/upload-content");
const upload_tiktok_1 = require("./functions/upload-tiktok");
const upload_tiktok_status_1 = require("./functions/upload-tiktok-status");
const upload_youtube_short_1 = require("./functions/upload-youtube-short");
const index_js_1 = require("./generated/index.js");
const constants_1 = require("./utils/constants");
dotenv_1.default.config();
exports.prisma = new index_js_1.PrismaClient();
exports.storage = new storage_1.Storage();
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)({
    origin: constants_1.APP_BASE_URL,
}));
app.post("/upload-content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, slug } = req.body;
    try {
        const { message } = yield (0, upload_content_1.uploadContent)({
            projectId,
            slug,
            prisma: exports.prisma,
            storage: exports.storage,
        });
        res.status(200).send(message);
    }
    catch (error) {
        res
            .status(400)
            .send(`Error Initializing content upload for ${projectId} / ${slug}`);
    }
}));
app.post("/upload-tiktok", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, slug } = req.body;
    const { message } = yield (0, upload_tiktok_1.uploadTikTok)({
        projectId,
        slug,
        prisma: exports.prisma,
    });
    res.status(200).send(message);
}));
app.post("/upload-youtube-short", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, slug } = req.body;
    const { message } = yield (0, upload_youtube_short_1.uploadYouTubeShort)({
        projectId,
        slug,
        prisma: exports.prisma,
    });
    res.status(200).send(message);
}));
app.get("/upload-tiktok-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project_id, publish_id } = req.query;
    try {
        const { message } = yield (0, upload_tiktok_status_1.uploadTikTokStatus)({
            projectId: project_id,
            publishId: publish_id,
            prisma: exports.prisma,
        });
        res.status(200).json(message);
    }
    catch (error) {
        res
            .status(400)
            .json(`Error checking tiktok upload status for ${publish_id}`);
    }
}));
if (!process.env.PORT) {
    throw new Error("PORT environment variable not set");
}
const port = parseInt(process.env.PORT);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
