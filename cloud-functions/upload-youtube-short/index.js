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
exports.uploadYoutubeShort = void 0;
var functions = require("@google-cloud/functions-framework");
var fs = require("fs");
var storage_1 = require("@google-cloud/storage");
var googleapis_1 = require("googleapis");
var generated_1 = require("./generated");
var prisma = new generated_1.PrismaClient();
var storage = new storage_1.Storage();
functions.cloudEvent("upload-youtube-short", function (cloudEvent) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, uploadYoutubeShort(cloudEvent)];
            case 1:
                _a.sent();
                return [2 /*return*/, { message: "success" }];
        }
    });
}); });
function uploadYoutubeShort(cloudEvent) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedData, slug, projectId, content, user, oauth2Client, currentProject, videoFilePath, error_1, token;
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
                                        youtubeCredentials: true,
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
                    oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.YOUTUBE_CLIENT_ID, process.env.YOUTUBE_CLIENT_SECRET, process.env.YOUTUBE_REDIRECT_URL);
                    return [4 /*yield*/, prisma.project.findUnique({
                            where: {
                                id: user.currentProjectId
                            },
                            select: {
                                youtubeCredentials: true
                            }
                        })];
                case 3:
                    currentProject = _a.sent();
                    console.log(currentProject, "CURRENT PROJECT");
                    if (!(currentProject === null || currentProject === void 0 ? void 0 : currentProject.youtubeCredentials)) {
                        throw new Error("NO_YOUTUBE_CREDENTIALS");
                    }
                    oauth2Client.setCredentials({
                        access_token: currentProject.youtubeCredentials.accessToken
                    });
                    videoFilePath = "".concat(content.slug, ".mp4");
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 5, , 8]);
                    storage
                        .bucket(user.currentProjectId)
                        .file(videoFilePath)
                        .createReadStream()
                        .pipe(fs.createWriteStream(videoFilePath))
                        .on("finish", function () {
                        var bodyStream = fs.createReadStream(videoFilePath);
                        var youtube = googleapis_1.google.youtube({
                            version: "v3",
                            auth: oauth2Client
                        });
                        youtube.videos
                            .insert({
                            part: ["snippet", "status"],
                            requestBody: {
                                snippet: {
                                    title: content.title,
                                    description: content.description,
                                    tags: content.tags
                                },
                                status: {
                                    privacyStatus: "private"
                                }
                            },
                            media: {
                                mimeType: "video/mp4",
                                body: bodyStream
                            }
                        })["finally"](function () {
                            fs.unlinkSync(videoFilePath);
                        });
                    });
                    return [3 /*break*/, 8];
                case 5:
                    error_1 = _a.sent();
                    console.log("AUTH ERR, HANDLING REFRESH TOKEN", error_1);
                    if (!(error_1 instanceof googleapis_1.google.auth.GoogleAuth)) return [3 /*break*/, 7];
                    oauth2Client.setCredentials({
                        refresh_token: currentProject.youtubeCredentials.refreshToken
                    });
                    return [4 /*yield*/, oauth2Client.getAccessToken()];
                case 6:
                    token = (_a.sent()).token;
                    if (token) {
                        oauth2Client.setCredentials({
                            access_token: token,
                            refresh_token: currentProject.youtubeCredentials.refreshToken
                        });
                    }
                    storage
                        .bucket(user.currentProjectId)
                        .file(videoFilePath)
                        .createReadStream()
                        .pipe(fs.createWriteStream(videoFilePath))
                        .on("finish", function () {
                        var bodyStream = fs.createReadStream(videoFilePath);
                        var youtube = googleapis_1.google.youtube({
                            version: "v3",
                            auth: oauth2Client
                        });
                        youtube.videos
                            .insert({
                            part: ["snippet", "status"],
                            requestBody: {
                                snippet: {
                                    title: content.title,
                                    description: content.description,
                                    tags: content.tags
                                },
                                status: {
                                    privacyStatus: "private"
                                }
                            },
                            media: {
                                mimeType: "video/mp4",
                                body: bodyStream
                            }
                        })["finally"](function () {
                            fs.unlinkSync(videoFilePath);
                        });
                    });
                    _a.label = 7;
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.uploadYoutubeShort = uploadYoutubeShort;
