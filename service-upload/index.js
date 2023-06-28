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
const ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
const storage_1 = require("@google-cloud/storage");
const child_process_1 = require("child_process");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const fs_1 = require("fs");
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const index_js_1 = require("./generated/index.js");
const constants_1 = require("./utils/constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)({
    origin: constants_1.APP_BASE_URL,
}));
const prisma = new index_js_1.PrismaClient();
const storage = new storage_1.Storage();
app.post("/upload-content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, slug } = req.body;
    const content = yield prisma.content.findUniqueOrThrow({
        where: {
            projectId_slug: {
                projectId,
                slug,
            },
        },
        select: {
            project: {
                select: {
                    youtubeCredentials: true,
                    tikTokCredentials: true,
                },
            },
        },
    });
    const filePath = `${slug}.mp4`;
    try {
        const testExists = yield storage.bucket(projectId).file(filePath).exists();
        console.log(testExists, "test exists");
        storage
            .bucket(projectId)
            .file(filePath)
            .createReadStream()
            .pipe((0, fs_1.createWriteStream)(filePath))
            .on("open", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("dl started");
            yield prisma.content.update({
                where: {
                    projectId_slug: {
                        projectId,
                        slug,
                    },
                },
                data: {
                    youtubeStatus: content.project.youtubeCredentials
                        ? index_js_1.UploadStatus.INITIALIZING
                        : undefined,
                    tikTokStatus: content.project.tikTokCredentials
                        ? index_js_1.UploadStatus.INITIALIZING
                        : undefined,
                },
            });
            res.status(200).send("started uploading content");
        }))
            .on("finish", () => {
            console.log("dl finished");
            (0, child_process_1.exec)(`${ffmpeg_1.path} -i ${filePath} -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${slug}.gif`, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.log("error creating gif", error);
                }
                else {
                    console.log("gif created");
                    yield storage
                        .bucket(projectId)
                        .upload(`${slug}.gif`)
                        .then(() => __awaiter(void 0, void 0, void 0, function* () {
                        yield prisma.content.update({
                            where: {
                                projectId_slug: {
                                    projectId,
                                    slug,
                                },
                            },
                            data: {
                                gif: `https://storage.googleapis.com/${projectId}/${slug}.gif`,
                            },
                        });
                    }));
                }
            }));
            if (content.project.youtubeCredentials) {
                fetch(`${constants_1.UPLOAD_SERVICE_BASE_URL}/upload-youtube-short`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        projectId,
                        slug,
                    }),
                });
            }
            if (content.project.tikTokCredentials) {
                fetch(`${constants_1.UPLOAD_SERVICE_BASE_URL}/upload-tiktok`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        projectId,
                        slug,
                    }),
                });
            }
        })
            .on("error", (err) => {
            console.log(err);
            res.status(500).send("Something went wrong!");
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error downloading file");
    }
}));
app.post("/upload-youtube-short", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { projectId, slug } = req.body;
    console.log("uploading to youtube", projectId, slug);
    const content = yield prisma.content.update({
        where: {
            projectId_slug: {
                projectId,
                slug,
            },
        },
        select: {
            title: true,
            description: true,
            tags: true,
        },
        data: {
            youtubeStatus: index_js_1.UploadStatus.UPLOADING,
        },
    });
    const project = yield prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            youtubeCredentials: true,
        },
    });
    const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.YOUTUBE_CLIENT_ID, process.env.YOUTUBE_CLIENT_SECRET, process.env.YOUTUBE_REDIRECT_URL);
    oauth2Client.setCredentials({
        access_token: (_b = project === null || project === void 0 ? void 0 : project.youtubeCredentials) === null || _b === void 0 ? void 0 : _b.accessToken,
        refresh_token: (_c = project === null || project === void 0 ? void 0 : project.youtubeCredentials) === null || _c === void 0 ? void 0 : _c.refreshToken,
    });
    const youtube = googleapis_1.google.youtube({
        version: "v3",
        auth: oauth2Client,
    });
    const filePath = `${req.body.slug}.mp4`;
    const bodyStream = (0, fs_1.createReadStream)(filePath);
    youtube.videos
        .insert({
        part: ["snippet", "status"],
        requestBody: {
            snippet: {
                title: content.title,
                description: content.description,
                tags: content.tags,
            },
            status: {
                privacyStatus: "private",
            },
        },
        media: {
            mimeType: "video/mp4",
            body: bodyStream,
        },
    })
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(response, "yt_response");
        yield prisma.content.update({
            where: {
                projectId_slug: {
                    projectId,
                    slug,
                },
            },
            data: {
                youtubeStatus: index_js_1.UploadStatus.PRIVATE,
                youtubeId: response.data.id,
            },
        });
        res.status(200).send("Video uploaded to youtube");
    }))
        .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.content.update({
            where: {
                projectId_slug: {
                    projectId,
                    slug,
                },
            },
            data: {
                youtubeStatus: index_js_1.UploadStatus.NOT_STARTED,
            },
        });
        console.log("yt_error:", error);
        res.status(400).send("Error uploading video to youtube:");
    }));
}));
app.post("/upload-tiktok", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, slug } = req.body;
    const project = yield prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            tikTokCredentials: true,
        },
    });
    if (!(project === null || project === void 0 ? void 0 : project.tikTokCredentials)) {
        throw new Error("no tiktok credentials");
    }
    try {
        const initRes = yield fetch(`https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
                "Content-Type": "application/json;",
            },
            body: JSON.stringify({
                source: "PULL_FROM_URL",
                video_url: `${constants_1.APP_BASE_URL}/resource/serve-video/${slug}`, // "https://sf16-va.tiktokcdn.com/obj/eden-va2/uvpapzpbxjH-aulauvJ-WV[[/ljhwZthlaukjlkulzlp/3min.mp4",
            }),
        });
        if (!initRes.ok) {
            throw new Error("ERROR_INITIALIZING_TIKTOK_UPLOAD");
        }
        const { data } = yield initRes.json();
        yield prisma.content.update({
            where: {
                projectId_slug: {
                    projectId,
                    slug,
                },
            },
            data: {
                tikTokStatus: index_js_1.UploadStatus.UPLOADING,
                tikTokId: data.publish_id,
            },
        });
        return res.status(200).send(data);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).send("Error initializing tiktok upload");
    }
}));
app.get(`/serve-video`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.query;
    const __dirname = path_1.default.resolve();
    const filePath = path_1.default.join(__dirname, `${slug}.mp4`);
    const fileSizeInBytes = (0, fs_1.statSync)(filePath).size;
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Length", fileSizeInBytes);
    res.setHeader("Content-Disposition", "inline");
    res.sendFile(filePath);
}));
app.get("/tiktok-upload-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { publish_id, project_id } = req.query;
    const project = yield prisma.project.findUnique({
        where: {
            id: project_id === null || project_id === void 0 ? void 0 : project_id.toString(),
        },
        select: {
            tikTokCredentials: true,
        },
    });
    const statusRes = yield fetch("https://open.tiktokapis.com/v2/post/publish/status/fetch/", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${(_d = project === null || project === void 0 ? void 0 : project.tikTokCredentials) === null || _d === void 0 ? void 0 : _d.accessToken}`,
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            publish_id,
        }),
    });
    if (!statusRes.ok) {
        const { status, statusText } = statusRes;
        res.status(status).send(statusText);
    }
    const statusResJson = yield statusRes.json();
    res.status(200).send(statusResJson);
}));
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080");
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
