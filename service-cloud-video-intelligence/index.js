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
const video_intelligence_1 = require("@google-cloud/video-intelligence");
const protos_1 = require("@google-cloud/video-intelligence/build/protos/protos");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const index_js_1 = require("./generated/index.js");
const constants_1 = require("./utils/constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)({
    origin: constants_1.APP_BASE_URL,
}));
const prisma = new index_js_1.PrismaClient();
const videoIntelligenceClient = new video_intelligence_1.v1.VideoIntelligenceServiceClient();
app.post("/annotate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { projectId, slug } = req.body;
    const content = yield prisma.content.findUnique({
        where: {
            projectId_slug: {
                projectId,
                slug,
            },
        },
        select: {
            projectId: true,
            slug: true,
        },
    });
    if (!content) {
        throw new Error("CONTENT_NOT_FOUND");
    }
    const gcsResourceUri = `gs://${content.projectId}/${content.slug}.mp4`;
    const request = {
        inputUri: gcsResourceUri,
        features: [protos_1.google.cloud.videointelligence.v1.Feature.LABEL_DETECTION],
    };
    const [operation] = yield videoIntelligenceClient.annotateVideo(request);
    console.log("Waiting for operation to complete...");
    const [operationResult] = yield operation.promise();
    const annotations = (_b = operationResult.annotationResults) === null || _b === void 0 ? void 0 : _b[0];
    const labels = annotations === null || annotations === void 0 ? void 0 : annotations.segmentLabelAnnotations;
    yield prisma.content.update({
        where: {
            projectId_slug: {
                projectId,
                slug,
            },
        },
        data: {
            annotations: JSON.stringify(annotations),
            labels: JSON.stringify(labels),
        },
    });
    return res.json({ success: true });
}));
app.post("/recognize-text", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { projectId, slug } = req.body;
    const content = yield prisma.content.findUnique({
        where: {
            projectId_slug: {
                projectId,
                slug,
            },
        },
        select: {
            projectId: true,
        },
    });
    if (!content) {
        throw new Error("CONTENT_NOT_FOUND");
    }
    const gcsUri = `gs://${projectId}/${slug}.mp4`;
    const request = {
        inputUri: gcsUri,
        features: [protos_1.google.cloud.videointelligence.v1.Feature.TEXT_DETECTION],
    };
    // Detects text in a video
    const [operation] = yield videoIntelligenceClient.annotateVideo(request);
    //   const results = await operation.promise();
    console.log("Waiting for operation to complete...");
    const results = (yield operation.promise());
    const textAnnotations = (_d = (_c = results[0]) === null || _c === void 0 ? void 0 : _c.annotationResults[0]) === null || _d === void 0 ? void 0 : _d.textAnnotations;
    if (textAnnotations !== undefined) {
        console.log(textAnnotations, "text annotations");
        textAnnotations.forEach((textAnnotation) => {
            console.log(`Text ${textAnnotation.text} occurs at:`);
            textAnnotation.segments.forEach((segment) => {
                const time = segment.segment;
                console.log(` Start: ${time.startTimeOffset.seconds || 0}.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`);
                console.log(` End: ${time.endTimeOffset.seconds || 0}.${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`);
                console.log(` Confidence: ${segment.confidence}`);
                segment.frames.forEach((frame) => {
                    const timeOffset = frame.timeOffset;
                    console.log(`Time offset for the frame: ${timeOffset.seconds || 0}` +
                        `.${(timeOffset.nanos / 1e6).toFixed(0)}s`);
                    console.log("Rotated Bounding Box Vertices:");
                    frame.rotatedBoundingBox.vertices.forEach((vertex) => {
                        console.log(`Vertex.x:${vertex.x}, Vertex.y:${vertex.y}`);
                    });
                });
            });
        });
    }
    res.json({ success: true });
}));
app.post("/transcribe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, slug } = req.body;
    const content = yield prisma.content.findUnique({
        where: {
            projectId_slug: {
                projectId,
                slug,
            },
        },
        select: {
            projectId: true,
        },
    });
    if (!content) {
        throw new Error("CONTENT_NOT_FOUND");
    }
    const gcsUri = `gs://${projectId}/${slug}.mp4`;
    const videoContext = {
        speechTranscriptionConfig: {
            languageCode: "en-US",
            enableAutomaticPunctuation: true,
        },
    };
    const request = {
        inputUri: gcsUri,
        videoContext: videoContext,
        features: [protos_1.google.cloud.videointelligence.v1.Feature.SPEECH_TRANSCRIPTION],
    };
    const [operation] = yield videoIntelligenceClient.annotateVideo(request);
    console.log("Waiting for operation to complete...");
    const [operationResult] = yield operation.promise();
    console.log(operationResult, "_operation result");
    yield prisma.content.update({
        where: {
            projectId_slug: {
                projectId,
                slug,
            },
        },
        data: {
            transcription: JSON.stringify(operationResult),
        },
    });
    res.json({ success: true });
}));
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080");
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});