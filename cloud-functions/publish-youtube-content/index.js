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
exports.publishYoutubeContent = void 0;
var functions = require("@google-cloud/functions-framework");
var googleapis_1 = require("googleapis");
var generated_1 = require("./generated");
var prisma = new generated_1.PrismaClient();
functions.cloudEvent("publish-youtube-content", function (cloudEvent) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, publishYoutubeContent(cloudEvent)];
            case 1:
                _a.sent();
                return [2 /*return*/, { message: "success" }];
        }
    });
}); });
function publishYoutubeContent(cloudEvent) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, slug, projectId, content, project, oauth2Client, youtube, updatedVideo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!cloudEvent.data) {
                        throw new Error("NO_DATA");
                    }
                    _a = JSON.parse(Buffer.from(cloudEvent.data, "base64").toString("utf8")), slug = _a.slug, projectId = _a.projectId;
                    return [4 /*yield*/, prisma.content.findUnique({
                            where: {
                                projectId_slug: {
                                    projectId: projectId,
                                    slug: slug
                                }
                            },
                            select: {
                                youtubeId: true,
                                youtubeStatus: true
                            }
                        })];
                case 1:
                    content = _b.sent();
                    console.log(content, "__CONTENT__");
                    if (!content) {
                        throw new Error("NO_CONTENT");
                    }
                    if (content.youtubeStatus === generated_1.UploadStatus.PUBLIC) {
                        return [2 /*return*/];
                    }
                    if (content.youtubeStatus === generated_1.UploadStatus.NOT_STARTED) {
                        console.log("HANDLE NOT STARTED");
                    }
                    return [4 /*yield*/, prisma.project.findUnique({
                            where: {
                                id: projectId
                            },
                            select: {
                                youtubeCredentials: true
                            }
                        })];
                case 2:
                    project = _b.sent();
                    if (!(project === null || project === void 0 ? void 0 : project.youtubeCredentials)) {
                        throw new Error("NO_YOUTUBE_CREDENTIALS");
                    }
                    oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.YOUTUBE_CLIENT_ID, process.env.YOUTUBE_CLIENT_SECRET, process.env.YOUTUBE_REDIRECT_URL);
                    oauth2Client.setCredentials({
                        access_token: project.youtubeCredentials.accessToken,
                        refresh_token: project.youtubeCredentials.refreshToken
                    });
                    youtube = googleapis_1.google.youtube({
                        version: "v3",
                        auth: oauth2Client
                    });
                    return [4 /*yield*/, youtube.videos.update({
                            part: ["status"],
                            requestBody: {
                                id: slug,
                                status: {
                                    privacyStatus: "public"
                                }
                            }
                        })];
                case 3:
                    updatedVideo = _b.sent();
                    if (updatedVideo.status !== 200) {
                        throw new Error("YOUTUBE_UPDATE_FAILED");
                    }
                    return [4 /*yield*/, prisma.content.update({
                            where: {
                                projectId_slug: {
                                    projectId: projectId,
                                    slug: slug
                                }
                            },
                            data: {
                                youtubeStatus: generated_1.UploadStatus.PUBLIC,
                                youtubePublishAt: null
                            }
                        })];
                case 4:
                    _b.sent();
                    return [2 /*return*/, {
                            message: "YouTube video ".concat(content.youtubeId, " is now public")
                        }];
            }
        });
    });
}
exports.publishYoutubeContent = publishYoutubeContent;
