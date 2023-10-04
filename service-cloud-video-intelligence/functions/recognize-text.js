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
exports.recognizeText = void 0;
const index_1 = require("../index");
function recognizeText({ projectId, slug, prisma, }) {
    var _a, _b;
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
            throw new Error(`No content for ${projectId} / ${slug}`);
        }
        const gcsUri = `gs://${content.projectId}/${content.slug}.mp4`;
        const request = {
            inputUri: gcsUri,
            features: [index_1.CloudIntelligenceTypes.Feature.TEXT_DETECTION.valueOf()],
        };
        const result = yield index_1.cloudIntelligence.annotateVideo(request);
        const [operation] = result;
        console.log("Waiting for operation to complete...");
        if (operation.error) {
            throw new Error(`Operation error`);
        }
        const results = (yield operation.promise());
        const textAnnotations = (_b = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.annotationResults[0]) === null || _b === void 0 ? void 0 : _b.textAnnotations;
        if (textAnnotations !== undefined) {
            yield prisma.content.update({
                where: {
                    projectId_slug: {
                        projectId,
                        slug,
                    },
                },
                data: {
                    annotations: JSON.stringify(textAnnotations),
                },
            });
        }
        return {
            message: `Created annotations for ${projectId} / ${slug}`,
            annotations: JSON.stringify(textAnnotations),
        };
    });
}
exports.recognizeText = recognizeText;
