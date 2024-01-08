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
function uploadYouTubeShort({ contentId, prisma, }) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield prisma.content.update({
            where: {
                id: contentId,
            },
            select: {
                title: true,
                description: true,
                tags: true,
                project: {
                    select: {
                        id: true,
                    },
                },
            },
            data: {
                youtubeStatus: generated_1.UploadStatus.UPLOADING,
            },
        });
        const project = yield prisma.project.findUnique({
            where: {
                id: content.project.id,
            },
            select: {
                youtubeCredentials: true,
            },
        });
        if (!((_a = project === null || project === void 0 ? void 0 : project.youtubeCredentials) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            !((_b = project === null || project === void 0 ? void 0 : project.youtubeCredentials) === null || _b === void 0 ? void 0 : _b.refreshToken)) {
            throw new Error(`Missing YouTube credentials for project ${content.project.id}`);
        }
        const oauth2Client = setOauth2ClientCredentials({
            accessToken: project.youtubeCredentials.accessToken,
            refreshToken: project.youtubeCredentials.refreshToken,
        });
        if (oauth2Client === null) {
            yield prisma.content.update({
                where: {
                    id: contentId,
                },
                data: {
                    youtubeStatus: generated_1.UploadStatus.NOT_STARTED,
                },
            });
            throw new Error("Error setting OAuth client credentials");
        }
        const youtube = googleapis_1.google.youtube({
            version: "v3",
            auth: oauth2Client,
        });
        const filePath = `${contentId}.mp4`;
        const bodyStream = (0, fs_1.createReadStream)(filePath);
        yield prisma.content.update({
            where: {
                id: contentId,
            },
            data: {
                youtubeStatus: generated_1.UploadStatus.UPLOADING,
            },
        });
        console.log(`Uploading ${contentId} to YouTube channel ${(_c = project.youtubeCredentials) === null || _c === void 0 ? void 0 : _c.channelId}`);
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
            var _d;
            console.log(response, "upload YouTube response");
            yield prisma.content.update({
                where: {
                    id: contentId,
                },
                data: {
                    youtubeStatus: generated_1.UploadStatus.PRIVATE,
                    youtubeId: response.data.id,
                },
            });
            return {
                message: `Uploaded ${contentId} to YouTube channel ${(_d = project.youtubeCredentials) === null || _d === void 0 ? void 0 : _d.channelId}`,
            };
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () {
            var _e;
            yield prisma.content.update({
                where: {
                    id: contentId,
                },
                data: {
                    youtubeStatus: generated_1.UploadStatus.NOT_STARTED,
                },
            });
            console.log(error);
            throw new Error(`Error uploading ${contentId} to YouTube channel ${(_e = project.youtubeCredentials) === null || _e === void 0 ? void 0 : _e.channelId}`);
        }));
    });
}
exports.uploadYouTubeShort = uploadYouTubeShort;
function setOauth2ClientCredentials({ accessToken, refreshToken, }) {
    try {
        const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.YOUTUBE_CLIENT_ID, process.env.YOUTUBE_CLIENT_SECRET, process.env.YOUTUBE_REDIRECT_URL);
        oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        return oauth2Client;
    }
    catch (error) {
        console.log(error, "Error setting OAuth2 client credentials");
        return null;
    }
}
