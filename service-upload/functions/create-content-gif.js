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
const child_process_1 = require("child_process");
function createContentGif({ projectId, slug, ffmpegPath, storage, prisma, }) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, child_process_1.exec)(`${ffmpegPath} -i ${slug}.mp4 -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${slug}.gif`, (error) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log(`Error creating gif ${projectId} $${slug}`, error);
                throw new Error("Error creating gif");
            }
            const cloudStoragePath = `https://storage.googleapis.com/${projectId}/${slug}.gif`;
            yield storage
                .bucket(projectId)
                .upload(`${slug}.gif`)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.content.update({
                    where: {
                        projectId_slug: {
                            projectId,
                            slug,
                        },
                    },
                    data: {
                        gif: cloudStoragePath,
                    },
                });
            }))
                .catch((error) => {
                console.log(error);
                throw new Error(`Error saving cloudStorage path ${cloudStoragePath}`);
            });
        }));
        return {
            success: true,
            message: `Created Gif for ${projectId} / ${slug}`,
        };
    });
}
exports.createContentGif = createContentGif;
