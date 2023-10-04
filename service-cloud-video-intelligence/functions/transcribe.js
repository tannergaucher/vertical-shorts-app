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
exports.transcribe = void 0;
const index_1 = require("../index");
function transcribe({ projectId, slug, prisma, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield prisma.content.findUnique({
            where: {
                projectId_slug: {
                    projectId,
                    slug,
                },
            },
            select: {
                projectId: true,
                slug: true,
            },
        });
        if (!content) {
            throw new Error("CONTENT_NOT_FOUND");
        }
        const gcsUri = `gs://${content.projectId}/${content.slug}.mp4`;
        const videoContext = {
            speechTranscriptionConfig: {
                languageCode: "en-US",
                enableAutomaticPunctuation: true,
            },
        };
        const request = {
            inputUri: gcsUri,
            videoContext: videoContext,
            features: [index_1.CloudIntelligenceTypes.Feature.SPEECH_TRANSCRIPTION.valueOf()],
        };
        const result = yield index_1.cloudIntelligence.annotateVideo(request);
        const [operation] = result;
        if (operation.error) {
            throw new Error(`Operation Error`);
        }
        console.log("Waiting for operation to complete...");
        const [operationResult] = yield operation.promise();
        yield prisma.content.update({
            where: {
                projectId_slug: {
                    projectId,
                    slug,
                },
            },
            data: {
                transcription: JSON.stringify(operationResult),
            },
        });
        return {
            message: `Created transcription for ${projectId} / ${slug}`,
            transcription: JSON.stringify(operationResult),
        };
    });
}
exports.transcribe = transcribe;
