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
exports.createContentGif = void 0;
const ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
const child_process_1 = require("child_process");
function createContentGif({ projectId, contentId, storage, prisma, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const gifFile = `${contentId}.gif`;
        const gifStoragePath = `https://storage.googleapis.com/${projectId}/${gifFile}`;
        (0, child_process_1.exec)(`${ffmpeg_1.path} -i ${contentId}.mp4 -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${gifFile}`, (error) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log(`Error`, error);
                throw new Error(`ffmpeg error creating ${gifFile}`);
            }
            yield storage
                .bucket(projectId)
                .upload(gifFile)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.content.update({
                    where: {
                        id: contentId,
                    },
                    data: {
                        gif: gifStoragePath,
                    },
                });
            }))
                .catch((error) => {
                console.log(error);
                throw new Error(`Error uploading ${gifFile} to ${gifStoragePath}`);
            });
        }));
        return {
            message: `Uploaded ${gifFile} url to ${gifStoragePath}`,
        };
    });
}
exports.createContentGif = createContentGif;
