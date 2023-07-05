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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.annotateVideo = void 0;
var functions = require("@google-cloud/functions-framework");
var video_intelligence_1 = require("@google-cloud/video-intelligence");
var protos_1 = require("@google-cloud/video-intelligence/build/protos/protos");
var generated_1 = require("./generated");
var prisma = new generated_1.PrismaClient();
functions.cloudEvent("annotate-video", function (cloudEvent) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, annotateVideo(cloudEvent)];
            case 1:
                _a.sent();
                return [2 /*return*/, { message: "success" }];
        }
    });
}); });
function annotateVideo(cloudEvent) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, slug, projectId, gcsResourceUri, client, request, operation, operationResult, annotations, labels;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!cloudEvent.data) {
                        throw new Error("NO_CLOUDEVENT_DATA");
                    }
                    _b = JSON.parse(Buffer.from(cloudEvent.data, "base64").toString("utf8")), slug = _b.slug, projectId = _b.projectId;
                    gcsResourceUri = "gs://".concat(projectId, "/").concat(slug);
                    client = new video_intelligence_1.v1.VideoIntelligenceServiceClient();
                    request = {
                        inputUri: gcsResourceUri,
                        features: [protos_1.google.cloud.videointelligence.v1.Feature.LABEL_DETECTION]
                    };
                    return [4 /*yield*/, client.annotateVideo(request)];
                case 1:
                    operation = (_c.sent())[0];
                    console.log("Waiting for operation to complete...");
                    return [4 /*yield*/, operation.promise()];
                case 2:
                    operationResult = (_c.sent())[0];
                    annotations = (_a = operationResult.annotationResults) === null || _a === void 0 ? void 0 : _a[0];
                    console.log("Annotations:", JSON.stringify(annotations, null, 2));
                    labels = annotations === null || annotations === void 0 ? void 0 : annotations.segmentLabelAnnotations;
                    console.log("Labels:", JSON.stringify(labels, null, 2));
                    labels === null || labels === void 0 ? void 0 : labels.forEach(function (label) {
                        var _a, _b;
                        console.log("Label ".concat((_a = label === null || label === void 0 ? void 0 : label.entity) === null || _a === void 0 ? void 0 : _a.description, " occurs at:"));
                        (_b = label === null || label === void 0 ? void 0 : label.segments) === null || _b === void 0 ? void 0 : _b.forEach(function (segment) {
                            var _a, _b, _c, _d, _e, _f;
                            var time = segment.segment;
                            if (time !== null && time !== undefined) {
                                if (((_a = time.startTimeOffset) === null || _a === void 0 ? void 0 : _a.seconds) === undefined) {
                                    time.startTimeOffset = { seconds: 0, nanos: 0 };
                                }
                                if (((_b = time.startTimeOffset) === null || _b === void 0 ? void 0 : _b.nanos) === undefined) {
                                    time.startTimeOffset.nanos = 0;
                                }
                                if (((_c = time.endTimeOffset) === null || _c === void 0 ? void 0 : _c.seconds) === undefined) {
                                    time.endTimeOffset = { seconds: 0, nanos: 0 };
                                }
                                if (((_d = time.endTimeOffset) === null || _d === void 0 ? void 0 : _d.nanos) === undefined) {
                                    time.endTimeOffset.nanos = 0;
                                }
                                console.log("\tStart: ".concat(time.startTimeOffset.seconds) +
                                    ".".concat(((_e = time.startTimeOffset.nanos) !== null && _e !== void 0 ? _e : 0 / 1e6).toFixed(0), "s"));
                                console.log("\tEnd: ".concat(time.endTimeOffset.seconds, ".") +
                                    "".concat(((_f = time.endTimeOffset.nanos) !== null && _f !== void 0 ? _f : 0 / 1e6).toFixed(0), "s"));
                            }
                            console.log("\tConfidence: ".concat(segment.confidence));
                        });
                    });
                    return [2 /*return*/, { message: "success" }];
            }
        });
    });
}
exports.annotateVideo = annotateVideo;
