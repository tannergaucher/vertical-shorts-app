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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadContent = void 0;
const ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const generated_1 = require("../generated");
const constants_1 = require("../utils/constants");
const create_content_gif_1 = require("./create-content-gif");
function uploadContent({ projectId, slug, prisma, storage, }) {
    return __awaiter(this, void 0, void 0, function* () {
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
        storage
            .bucket(projectId)
            .file(filePath)
            .createReadStream()
            .pipe((0, fs_1.createWriteStream)(filePath))
            .on("open", () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Downloading started from gcp bucket ${projectId}/${slug}`);
            yield prisma.content.update({
                where: {
                    projectId_slug: {
                        projectId,
                        slug,
                    },
                },
                data: {
                    youtubeStatus: content.project.youtubeCredentials
                        ? generated_1.UploadStatus.INITIALIZING
                        : undefined,
                    tikTokStatus: content.project.tikTokCredentials
                        ? generated_1.UploadStatus.INITIALIZING
                        : undefined,
                },
            });
        }))
            .on("error", (err) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.content.update({
                where: {
                    projectId_slug: {
                        projectId,
                        slug,
                    },
                },
                data: {
                    youtubeStatus: generated_1.UploadStatus.NOT_STARTED,
                    tikTokStatus: generated_1.UploadStatus.NOT_STARTED,
                },
            });
            throw new Error(`Error downloading from gcp bucket, ${err.message}`);
        }))
            .on("finish", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Downloaded video from gcp bucket");
            const socialChannels = (0, lodash_1.compact)([
                content.project.youtubeCredentials
                    ? fetch(`${constants_1.UPLOAD_SERVICE_BASE_URL}/upload-youtube-short`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            projectId,
                            slug,
                        }),
                    })
                    : undefined,
                content.project.tikTokCredentials
                    ? fetch(`${constants_1.UPLOAD_SERVICE_BASE_URL}/upload-tiktok`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            projectId,
                            slug,
                        }),
                    })
                    : undefined,
            ]);
            yield Promise.all([
                socialChannels.map((socialChannel) => socialChannel),
                (0, create_content_gif_1.createContentGif)({
                    projectId,
                    slug,
                    storage,
                    prisma,
                    ffmpegPath: ffmpeg_1.path,
                }),
            ]);
        }));
        return {
            message: `Uploaded content to social channels!  projectId:${projectId} slug:${slug}`,
        };
    });
}
exports.uploadContent = uploadContent;
