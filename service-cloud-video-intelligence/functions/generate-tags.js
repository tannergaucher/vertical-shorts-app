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
const protos_1 = require("@google-cloud/video-intelligence/build/protos/protos");
const index_1 = require("../index");
function getTagsFromLabels(labels) {
    if (!labels) {
        return [];
    }
    return labels.flatMap((label) => { var _a; return ((_a = label.entity) === null || _a === void 0 ? void 0 : _a.description) ? label.entity.description : []; });
}
function generateTags(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { projectId, slug } = req.body;
        const content = yield index_1.prisma.content.findUnique({
            where: {
                projectId_slug: {
                    projectId,
                    slug,
                },
            },
            select: {
                projectId: true,
                slug: true,
                annotations: true,
                labels: true,
            },
        });
        if (!content) {
            throw new Error("CONTENT_NOT_FOUND");
        }
        const contentLabels = JSON.parse(content.labels);
        const tags = getTagsFromLabels(contentLabels);
        if (tags.length > 0) {
            return res.json({
                success: true,
                tags,
            });
        }
        try {
            const annotateVideoRequest = {
                inputUri: `gs://${content.projectId}/${content.slug}.mp4`,
                features: [protos_1.google.cloud.videointelligence.v1.Feature.LABEL_DETECTION],
            };
            const [operation] = yield index_1.cloudIntelligence.annotateVideo(annotateVideoRequest);
            console.log("Waiting for operation to complete...");
            const [operationResult] = yield operation.promise();
            const annotations = (_a = operationResult.annotationResults) === null || _a === void 0 ? void 0 : _a[0];
            const tags = getTagsFromLabels(annotations === null || annotations === void 0 ? void 0 : annotations.segmentLabelAnnotations);
            if (tags.length > 0) {
                yield index_1.prisma.content.update({
                    where: {
                        projectId_slug: {
                            projectId,
                            slug,
                        },
                    },
                    data: {
                        tags,
                    },
                });
                return res.json({
                    success: true,
                    tags,
                });
            }
            return res.json({
                success: false,
                tags: [],
            });
        }
        catch (error) {
            console.error(error);
            return res.json({
                success: false,
                tags: [],
            });
        }
    });
}
exports.generateTags = generateTags;
