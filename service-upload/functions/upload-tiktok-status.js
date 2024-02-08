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
exports.uploadTikTokStatus = void 0;
function uploadTikTokStatus({ prisma, projectId, publishId, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const project = yield prisma.project.findUnique({
            where: {
                id: projectId,
            },
            select: {
                tikTokCredentials: true,
            },
        });
        if (!((_a = project === null || project === void 0 ? void 0 : project.tikTokCredentials) === null || _a === void 0 ? void 0 : _a.accessToken)) {
            throw new Error(`Missing TikTok access token for project ${projectId}`);
        }
        const res = yield fetch("https://open.tiktokapis.com/v2/post/publish/status/fetch/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                publish_id: publishId,
            }),
        });
        if (!res.ok) {
            throw new Error(`Error fetching tiktok status publish_id ${publishId}`);
        }
        return {
            message: `Status for publish_id ${publishId}`,
            json: res.json(),
        };
    });
}
exports.uploadTikTokStatus = uploadTikTokStatus;
