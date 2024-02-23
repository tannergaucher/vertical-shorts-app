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
exports.generateTags = void 0;
const index_1 = require("../index");
const index_2 = require("../index");
function generateTags({ contentId, prisma }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield prisma.content.findUnique({
            where: {
                id: contentId,
            },
            select: {
                id: true,
                projectId: true,
                annotations: true,
                labels: true,
            },
        });
        if (!content) {
            throw new Error("CONTENT_NOT_FOUND");
        }
        const labelAnnotations = JSON.parse(content.labels);
        const tags = getTagsFromLabelAnnotations(labelAnnotations);
        if (tags.length > 0) {
            return {
                tags,
                message: `${tags.length} tags already generated for ${contentId}`,
            };
        }
        try {
            const annotateVideoRequest = {
                inputUri: `gs://${content.projectId}/${content.id}.mp4`,
                features: [index_1.CloudIntelligenceTypes.Feature.LABEL_DETECTION.valueOf()],
            };
            const result = yield index_2.cloudIntelligence.annotateVideo(annotateVideoRequest);
            const [operation] = result;
            if (operation.error) {
                throw new Error(`Operation error`);
            }
            console.log("Waiting for operation to complete...");
            const [operationResult] = yield operation.promise();
            const annotations = (_a = operationResult.annotationResults) === null || _a === void 0 ? void 0 : _a[0];
            const tags = getTagsFromLabelAnnotations(annotations === null || annotations === void 0 ? void 0 : annotations.segmentLabelAnnotations);
            if (tags.length > 0) {
                yield prisma.content.update({
                    where: {
                        id: contentId,
                    },
                    data: {
                        tags,
                    },
                });
                return {
                    tags,
                    message: `Successfully generated ${tags.length} Tags`,
                };
            }
            return {
                tags: [],
                message: "No tags generated",
            };
        }
        catch (error) {
            console.error(error);
            throw new Error(`Error generating tags for ${contentId}`);
        }
    });
}
exports.generateTags = generateTags;
function getTagsFromLabelAnnotations(labelAnnotations) {
    if (!labelAnnotations) {
        return [];
    }
    return labelAnnotations.flatMap((labelAnnotation) => {
        var _a;
        return ((_a = labelAnnotation.entity) === null || _a === void 0 ? void 0 : _a.description)
            ? labelAnnotation.entity.description
            : [];
    });
}
