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
exports.initializeUpload = void 0;
const fs_1 = require("fs");
const generated_1 = require("../generated");
const routes_1 = require("../routes");
const constants_1 = require("../utils/constants");
function initializeUpload({ projectId, contentId, prisma, storage, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield prisma.content.findUniqueOrThrow({
            where: {
                id: contentId,
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
        const bucketPath = `${projectId}/${contentId}`;
        const videoPath = `${contentId}.mp4`;
        storage
            .bucket(projectId)
            .file(videoPath)
            .createReadStream()
            .pipe((0, fs_1.createWriteStream)(videoPath))
            .on("open", () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Downloading ${videoPath} from ${bucketPath}`);
            yield prisma.content.update({
                where: {
                    id: contentId,
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
            .on("finish", () => __awaiter(this, void 0, void 0, function* () {
            if (content.project.youtubeCredentials) {
                fetch(`${constants_1.SERVICE_UPLOAD_BASE_URL}${routes_1.ServiceUploadRoutes.UploadYoutubeShort}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        projectId,
                        contentId,
                    }),
                });
            }
            if (content.project.tikTokCredentials) {
                fetch(`${constants_1.SERVICE_UPLOAD_BASE_URL}${routes_1.ServiceUploadRoutes.UploadTiktok}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        projectId,
                        contentId,
                    }),
                });
            }
        }))
            .on("error", (err) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.content.update({
                where: {
                    id: contentId,
                },
                data: {
                    youtubeStatus: generated_1.UploadStatus.NOT_STARTED,
                    tikTokStatus: generated_1.UploadStatus.NOT_STARTED,
                },
            });
            throw new Error(`Error downloading from ${bucketPath}, ${err.message}`);
        }));
        return {
            message: `Uploaded ${projectId} / ${contentId} to social channels`,
        };
    });
}
exports.initializeUpload = initializeUpload;
