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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.CloudIntelligenceTypes = exports.cloudIntelligence = void 0;
const video_intelligence_1 = require("@google-cloud/video-intelligence");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const cloud_intelligence_types_1 = require("./cloud-intelligence-types");
Object.defineProperty(exports, "CloudIntelligenceTypes", { enumerable: true, get: function () { return cloud_intelligence_types_1.CloudIntelligenceTypes; } });
const generate_tags_1 = require("./functions/generate-tags");
const recognize_text_1 = require("./functions/recognize-text");
const transcribe_1 = require("./functions/transcribe");
const index_js_1 = require("./generated/index.js");
const constants_1 = require("./utils/constants");
dotenv_1.default.config({
    path: `../.env.${process.env.NODE_ENV}`,
});
exports.cloudIntelligence = new video_intelligence_1.v1.VideoIntelligenceServiceClient();
exports.prisma = new index_js_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)({
    origin: constants_1.APP_BASE_URL,
}));
app.post("/generate-tags", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const { message } = yield (0, generate_tags_1.generateTags)({
            contentId,
            prisma: exports.prisma,
        });
        res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(`Error generating tags for ${contentId}`);
    }
}));
app.post("/recognize-text", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const { message } = yield (0, recognize_text_1.recognizeText)({
            contentId,
            prisma: exports.prisma,
        });
        res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error recognizing text for ${contentId}`);
    }
}));
app.post("/transcribe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const { message } = yield (0, transcribe_1.transcribe)({
            contentId,
            prisma: exports.prisma,
        });
        res.status(200).send(message);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error transcribing content ${contentId}`);
    }
}));
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080");
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
