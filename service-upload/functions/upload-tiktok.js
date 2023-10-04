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
function uploadTikTok({ projectId, slug, prisma, }) {
    return __awaiter(this, void 0, void 0, function* () {
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
        console.log(`Starting upload to tiktok for ${projectId} / ${slug}`);
        const initResponse = yield fetch(`https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
                "Content-Type": "application/json;",
            },
            body: JSON.stringify({
                source: "PULL_FROM_URL",
                video_url: `${constants_1.APP_BASE_URL}/resource/serve-video/${projectId}/${slug}`, // "https://sf16-va.tiktokcdn.com/obj/eden-va2/uvpapzpbxjH-aulauvJ-WV[[/ljhwZthlaukjlkulzlp/3min.mp4",
            }),
        });
        if (!initResponse.ok) {
            console.log(initResponse);
            throw new Error(`Error on tiktok initialization request for ${projectId} / ${slug}`);
        }
        return {
            message: `Success initializing tiktok upload for ${projectId} / ${slug}`,
            initResponse: initResponse.json(),
        };
    });
}
exports.uploadTikTok = uploadTikTok;
