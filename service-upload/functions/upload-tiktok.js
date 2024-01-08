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
exports.uploadTikTok = void 0;
const constants_1 = require("../utils/constants");
function uploadTikTok({ contentId, prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield prisma.content.findUniqueOrThrow({
            where: {
                id: contentId,
            },
            select: {
                project: {
                    select: {
                        id: true,
                        tikTokCredentials: true,
                    },
                },
            },
        });
        if (!content.project.tikTokCredentials) {
            throw new Error("Missing TikTok credentials");
        }
        console.log(`Starting upload to ${contentId} to tiktok`);
        yield prisma.content.update({
            where: {
                id: contentId,
            },
            data: {
                tikTokStatus: "UPLOADING",
            },
        });
        const res = yield fetch(`https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${content.project.tikTokCredentials.accessToken}`,
                "Content-Type": "application/json;",
            },
            body: JSON.stringify({
                source: "PULL_FROM_URL",
                video_url: `${constants_1.APP_BASE_URL}/resource/serve-video/${content.project.id}/${contentId}`,
            }),
        });
        if (!res.ok) {
            yield prisma.content.update({
                where: {
                    id: contentId,
                },
                data: {
                    tikTokStatus: "NOT_STARTED",
                },
            });
            throw new Error(`Error initializing TikTok upload for ${contentId}`);
        }
        return {
            message: `Initialized TikTok upload for ${contentId}`,
        };
    });
}
exports.uploadTikTok = uploadTikTok;
