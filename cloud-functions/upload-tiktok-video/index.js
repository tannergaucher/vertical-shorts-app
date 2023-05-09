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
exports.uploadTikTokVideo = void 0;
var functions = require("@google-cloud/functions-framework");
var fs = require("fs");
var storage_1 = require("@google-cloud/storage");
var generated_1 = require("./generated");
var prisma = new generated_1.PrismaClient();
var storage = new storage_1.Storage();
functions.cloudEvent("upload-tiktok-video", function (cloudEvent) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, uploadTikTokVideo(cloudEvent)];
            case 1:
                _a.sent();
                return [2 /*return*/, { message: "success" }];
        }
    });
}); });
function uploadTikTokVideo(cloudEvent) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedData, slug, projectId, content, user, currentProject, videoFilePath;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedData = JSON.parse(Buffer.from(cloudEvent.data, "base64").toString("utf8"));
                    slug = parsedData.slug, projectId = parsedData.projectId;
                    return [4 /*yield*/, prisma.content.findUnique({
                            where: {
                                projectId_slug: {
                                    projectId: projectId,
                                    slug: slug
                                }
                            },
                            select: {
                                slug: true,
                                title: true,
                                description: true,
                                tags: true,
                                published: true,
                                project: {
                                    select: {
                                        id: true,
                                        tikTokCredentials: true,
                                        user: {
                                            select: {
                                                id: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                case 1:
                    content = _a.sent();
                    if (!content) {
                        throw new Error("NO_CONTENT");
                    }
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: {
                                id: content.project.user.id
                            },
                            select: {
                                id: true,
                                currentProjectId: true
                            }
                        })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("NO_USER");
                    }
                    if (!user.currentProjectId) {
                        throw new Error("NO_CURRENT_PROJECT");
                    }
                    return [4 /*yield*/, prisma.project.findUnique({
                            where: {
                                id: user.currentProjectId
                            },
                            select: {
                                tikTokCredentials: true
                            }
                        })];
                case 3:
                    currentProject = _a.sent();
                    videoFilePath = "".concat(content.slug, ".mp4");
                    try {
                        storage
                            .bucket(user.currentProjectId)
                            .file(videoFilePath)
                            .createReadStream()
                            .pipe(fs.createWriteStream(videoFilePath))
                            .on("finish", function () { return __awaiter(_this, void 0, void 0, function () {
                            var res, data, statusRes, statusData;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, fetch("https://open.tiktokapis.com/v2/post/publish/inbox/video/init/", {
                                            method: "POST",
                                            headers: {
                                                Authorization: "Bearer ".concat((_a = currentProject === null || currentProject === void 0 ? void 0 : currentProject.tikTokCredentials) === null || _a === void 0 ? void 0 : _a.accessToken)
                                            },
                                            body: JSON.stringify({
                                                source: videoFilePath,
                                                total_chunk_count: 1
                                            })
                                        })];
                                    case 1:
                                        res = _c.sent();
                                        if (!res.ok) return [3 /*break*/, 6];
                                        return [4 /*yield*/, res.json()];
                                    case 2:
                                        data = _c.sent();
                                        // using put reeust, upload video to tiktok
                                        return [4 /*yield*/, fetch(data.data.upload_url, {
                                                method: "PUT",
                                                headers: {
                                                    "Content-Type": "video/mp4"
                                                },
                                                body: JSON.stringify({
                                                    data: videoFilePath
                                                })
                                            })];
                                    case 3:
                                        // using put reeust, upload video to tiktok
                                        _c.sent();
                                        return [4 /*yield*/, fetch("https://open.tiktokapis.com/v2/post/publish/status/fetch/", {
                                                headers: {
                                                    Authorization: "Bearer ".concat((_b = currentProject === null || currentProject === void 0 ? void 0 : currentProject.tikTokCredentials) === null || _b === void 0 ? void 0 : _b.accessToken)
                                                },
                                                body: JSON.stringify({
                                                    publish_id: data.data.publish_id
                                                })
                                            })];
                                    case 4:
                                        statusRes = _c.sent();
                                        return [4 /*yield*/, statusRes.json()];
                                    case 5:
                                        statusData = _c.sent();
                                        console.log(statusData, "statusData");
                                        _c.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    catch (error) {
                        console.log(error);
                        throw new Error("ERROR_INSERTING_YOUTUBE_VIDEO");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadTikTokVideo = uploadTikTokVideo;
