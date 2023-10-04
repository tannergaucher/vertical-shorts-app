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
exports.uploadYouTubeShort = void 0;
const fs_1 = require("fs");
const googleapis_1 = require("googleapis");
const generated_1 = require("../generated");
function uploadYouTubeShort({ projectId, slug, prisma, }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
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
                youtubeStatus: generated_1.UploadStatus.UPLOADING,
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
        if (!((_a = project === null || project === void 0 ? void 0 : project.youtubeCredentials) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            !((_b = project === null || project === void 0 ? void 0 : project.youtubeCredentials) === null || _b === void 0 ? void 0 : _b.refreshToken)) {
            throw new Error("No youtube credentials found");
        }
        const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.YOUTUBE_CLIENT_ID, process.env.YOUTUBE_CLIENT_SECRET, process.env.YOUTUBE_REDIRECT_URL);
        oauth2Client.setCredentials({
            access_token: project.youtubeCredentials.accessToken,
            refresh_token: project.youtubeCredentials.refreshToken,
        });
        const youtube = googleapis_1.google.youtube({
            version: "v3",
            auth: oauth2Client,
        });
        const filePath = `${slug}.mp4`;
        const bodyStream = (0, fs_1.createReadStream)(filePath);
        yield prisma.content.update({
            where: {
                projectId_slug: {
                    projectId,
                    slug,
                },
            },
            data: {
                youtubeStatus: generated_1.UploadStatus.UPLOADING,
            },
        });
        console.log(`Upload started for video ${projectId} / ${slug}`);
        return youtube.videos
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
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.content.update({
                where: {
                    projectId_slug: {
                        projectId,
                        slug,
                    },
                },
                data: {
                    youtubeStatus: generated_1.UploadStatus.PRIVATE,
                    youtubeId: response.data.id,
                },
            });
            return {
                message: `Success uploading ${projectId} ${slug} to youtube`,
            };
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.content.update({
                where: {
                    projectId_slug: {
                        projectId,
                        slug,
                    },
                },
                data: {
                    youtubeStatus: generated_1.UploadStatus.NOT_STARTED,
                },
            });
            console.log(error);
            throw new Error(`Error uploading ${projectId} / ${slug} to youtube`);
        }));
    });
}
exports.uploadYouTubeShort = uploadYouTubeShort;
