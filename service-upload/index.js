"use strict";
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.prisma = void 0;
const storage_1 = require("@google-cloud/storage");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const create_content_gif_1 = require("./functions/create-content-gif");
const initialize_upload_1 = require("./functions/initialize-upload");
const update_content_1 = require("./functions/update-content");
const upload_tiktok_1 = require("./functions/upload-tiktok");
const upload_tiktok_status_1 = require("./functions/upload-tiktok-status");
const upload_youtube_short_1 = require("./functions/upload-youtube-short");
const index_js_1 = require("./generated/index.js");
const routes_1 = require("./routes");
const constants_1 = require("./utils/constants");
dotenv_1.default.config({
    path: `../.env.${process.env.NODE_ENV}`,
});
exports.prisma = new index_js_1.PrismaClient();
exports.storage = new storage_1.Storage();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: constants_1.APP_BASE_URL,
}));
app.post(routes_1.ServiceUploadRoutes.InitializeUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, contentId } = req.body;
    try {
        const { message } = yield (0, initialize_upload_1.initializeUpload)({
            projectId,
            contentId,
            prisma: exports.prisma,
            storage: exports.storage,
        });
        res.status(200).send(message);
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .send(`Error initializing upload ${projectId} ${contentId}`);
    }
}));
app.post(routes_1.ServiceUploadRoutes.UploadTiktok, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const { message } = yield (0, upload_tiktok_1.uploadTikTok)({
            contentId,
            prisma: exports.prisma,
        });
        res.status(200).send(message);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error uploading ${contentId} to TikTok`);
    }
}));
app.post(routes_1.ServiceUploadRoutes.UploadYoutubeShort, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const { message } = yield (0, upload_youtube_short_1.uploadYouTubeShort)({
            contentId,
            prisma: exports.prisma,
        });
        res.status(200).send(message);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error uploading ${contentId} YouTube Short`);
    }
}));
app.post(routes_1.ServiceUploadRoutes.CreateContentGif, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, contentId } = req.body;
    try {
        const { message } = yield (0, create_content_gif_1.createContentGif)({
            projectId,
            contentId,
            storage: exports.storage,
            prisma: exports.prisma,
        });
        res.status(200).send(message);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error creating gif for ${contentId}`);
    }
}));
app.post(routes_1.ServiceUploadRoutes.UpdateContent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, bucketUrl } = req.body;
    try {
        const { message, content } = yield (0, update_content_1.updateContent)({
            prisma: exports.prisma,
            contentId,
            bucketUrl,
        });
        res.status(200).json({
            message,
            content,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error updating content ${contentId}`);
    }
}));
app.get(routes_1.ServiceUploadRoutes.UploadTiktokStatus, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(error);
        res
            .status(400)
            .json(`Error getting upload status for TikTok publish_id ${publish_id}`);
    }
}));
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080");
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
