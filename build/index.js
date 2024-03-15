var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
  functions: () => functions,
  pubsub: () => pubsub,
  storage: () => storage
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_storage = require("@google-cloud/storage"), import_pubsub = require("@google-cloud/pubsub"), functions = __toESM(require("@google-cloud/functions-framework")), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), projectId = "homerice", storage = new import_storage.Storage({
  keyFilename: "./service-account.json",
  projectId
}), pubsub = new import_pubsub.PubSub({
  projectId,
  keyFilename: "./service-account.json"
}), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let callbackName = (0, import_isbot.default)(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 40,
        columnNumber: 7
      }, this),
      {
        [callbackName]: () => {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_react2 = require("@remix-run/react"), import_node3 = require("@remix-run/node"), import_react3 = require("@remix-run/react"), import_react4 = require("@remix-run/react");

// app/styles/index.css
var styles_default = "/build/_assets/index-QYV6F26B.css";

// app/session.server.ts
var import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client"), prisma;
global.__db__ || (global.__db__ = new import_client.PrismaClient()), prisma = global.__db__, prisma.$connect();

// app/models/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      projects: !0
    }
  });
}
async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
async function createUser(email, password) {
  let hashedPassword = await import_bcryptjs.default.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });
}
async function verifyLogin(email, password) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: !0
    }
  });
  if (!userWithPassword || !userWithPassword.password || !await import_bcryptjs.default.compare(
    password,
    userWithPassword.password.hash
  ))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node2.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/routes.ts
var Routes = {
  Index: "/",
  AuthorizeYoutube: "/authorize-integration/youtube",
  AuthorizeTikTok: "/authorize-integration/tiktok",
  AuthorizeInstagram: "/authorize-integration/instagram",
  AuthorizeFacebook: "/authorize-integration/facebook",
  AuthorizeTwitter: "/authorize-integration/twitter",
  Admin: "/admin",
  AdminCreateProject: "/admin/create-project",
  AdminContent: (slug) => `/admin/content/${slug}`,
  AdminContentPreview: (slug) => `/admin/content/preview/${slug}`,
  AdminContentTitle: "/admin/content/title",
  AdminContentThumbnail: (slug) => `/admin/content/thumbnail/${slug}`,
  AdminContenVideo: (slug) => `/admin/content/video/${slug}`,
  Login: "/login",
  Logout: "/logout"
};

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  },
  {
    rel: "stylesheet",
    href: styles_default
  }
], meta = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1"
});
async function loader({ request }) {
  return (0, import_node3.json)({
    user: await getUser(request)
  });
}
function App() {
  let { user } = (0, import_react4.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("nav", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to: Routes.Index, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("em", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Posts" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 63,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 62,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 61,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to: Routes.AdminContentTitle, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("em", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Publisher" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 70,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 69,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 68,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 67,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to: Routes.Admin, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("em", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Settings" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 77,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 76,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 75,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this),
        user ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
          import_react2.Link,
          {
            to: Routes.Login,
            style: {
              textDecoration: "none"
            },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("em", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("b", { children: "Login" }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 90,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 89,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 88,
              columnNumber: 15
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/root.tsx",
            lineNumber: 82,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 96,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 98,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
}

// app/routes/authorize-integration/facebook-and-instagram/index.tsx
var facebook_and_instagram_exports = {};
__export(facebook_and_instagram_exports, {
  action: () => action,
  default: () => Page
});
var import_react5 = require("@remix-run/react"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), action = () => {
};
function Page() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: "Authorize Instagram and Facebook" }, void 0, !1, {
      fileName: "app/routes/authorize-integration/facebook-and-instagram/index.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react5.Form, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { type: "submit", children: "Authorize" }, void 0, !1, {
      fileName: "app/routes/authorize-integration/facebook-and-instagram/index.tsx",
      lineNumber: 13,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/authorize-integration/facebook-and-instagram/index.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/authorize-integration/facebook-and-instagram/index.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/routes/authorize-integration/tik-tok/success.tsx
var success_exports = {};
__export(success_exports, {
  default: () => Page2
});
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function Page2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { children: "Success!" }, void 0, !1, {
    fileName: "app/routes/authorize-integration/tik-tok/success.tsx",
    lineNumber: 4,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/authorize-integration/tik-tok/success.tsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/routes/authorize-integration/youtube/success.tsx
var success_exports2 = {};
__export(success_exports2, {
  default: () => Page3,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node"), import_googleapis = require("googleapis"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), loader2 = async ({ request }) => {
  var _a, _b;
  let user = await getUser(request);
  if (!user)
    return (0, import_node4.redirect)("/login");
  (0, import_tiny_invariant2.default)(
    typeof user.currentProjectId == "string",
    "Current project is required"
  );
  let authorizationCode = new URL(request.url).searchParams.get("code");
  if (!authorizationCode)
    return (0, import_node4.redirect)("/authorize-integration/youtube");
  let oauth2Client = new import_googleapis.google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  ), { tokens } = await oauth2Client.getToken(authorizationCode);
  oauth2Client.setCredentials(tokens);
  let youtube = import_googleapis.google.youtube({
    version: "v3",
    auth: oauth2Client
  }), { data } = await youtube.channels.list({
    part: ["snippet", "contentDetails", "statistics"],
    mine: !0
  }), snippet = (_a = data == null ? void 0 : data.items) == null ? void 0 : _a[0].snippet, statistics = (_b = data.items) == null ? void 0 : _b[0].statistics;
  if (tokens.access_token && user.currentProjectId)
    return await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        projects: {
          update: {
            where: {
              id: user.currentProjectId
            },
            data: {
              youtubeCredentials: {
                upsert: {
                  create: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                    userId: user.id
                  },
                  update: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token
                  }
                }
              },
              channels: {
                upsert: {
                  where: {
                    projectId_channelType: {
                      projectId: user.currentProjectId,
                      channelType: "YOUTUBE"
                    }
                  },
                  create: {
                    channelType: "YOUTUBE",
                    name: (snippet == null ? void 0 : snippet.title) ?? "Untitled",
                    views: parseInt((statistics == null ? void 0 : statistics.viewCount) ?? "0", 10),
                    subscribers: parseInt(
                      (statistics == null ? void 0 : statistics.subscriberCount) ?? "0",
                      10
                    )
                  },
                  update: {
                    name: (snippet == null ? void 0 : snippet.title) ?? "Untitled",
                    views: parseInt((statistics == null ? void 0 : statistics.viewCount) ?? "0", 10),
                    subscribers: parseInt(
                      (statistics == null ? void 0 : statistics.subscriberCount) ?? "0",
                      10
                    )
                  }
                }
              }
            }
          }
        }
      }
    }), null;
};
function Page3() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { children: "Success!" }, void 0, !1, {
    fileName: "app/routes/authorize-integration/youtube/success.tsx",
    lineNumber: 117,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/authorize-integration/youtube/success.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
}

// app/routes/authorize-integration/tik-tok/index.tsx
var tik_tok_exports = {};
__export(tik_tok_exports, {
  loader: () => loader3
});
var import_node5 = require("@remix-run/node"), loader3 = async () => {
  let xsrfState = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), url = `https://www.tiktok.com/auth/authorize?client_key=${process.env.TIKTOK_CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent(
    "http://localhost:3000/authorize-integration/tiktok/success"
  )}&state=${xsrfState}`;
  return (0, import_node5.redirect)(url);
};

// app/routes/authorize-integration/youtube/index.tsx
var youtube_exports = {};
__export(youtube_exports, {
  loader: () => loader4
});
var import_node6 = require("@remix-run/node"), import_googleapis2 = require("googleapis"), loader4 = async () => {
  let oauth2Client = new import_googleapis2.google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  ), scopes = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly"
  ], url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    redirect_uri: "http://localhost:3000/authorize-integration/youtube/success"
  });
  return (0, import_node6.redirect)(url);
};

// app/routes/admin/content/thumbnail/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  action: () => action2,
  default: () => Page4,
  loader: () => loader5
});
var import_node7 = require("@remix-run/node"), import_react6 = require("@remix-run/react"), import_tiny_invariant3 = __toESM(require("tiny-invariant"));

// app/models/content.server.ts
async function getContent(params) {
  let { slug, projectId: projectId2 } = params;
  return prisma.content.findUniqueOrThrow({
    where: {
      projectId_slug: {
        projectId: projectId2,
        slug
      }
    },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: !0
            }
          }
        }
      }
    }
  });
}
async function getContents(params) {
  let { projectId: projectId2 } = params;
  return prisma.content.findMany({
    where: {
      projectId: projectId2
    }
  });
}
async function upsertContent(content) {
  return prisma.content.upsert({
    where: {
      projectId_slug: {
        projectId: content.projectId,
        slug: content.slug
      }
    },
    create: {
      slug: content.slug,
      projectId: content.projectId,
      title: content.title || "Untitled Content",
      published: content.published || !1,
      markdown: content.markdown || ""
    },
    update: {
      ...content
    }
  });
}

// app/routes/admin/content/thumbnail/$slug.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), loader5 = async ({ params, request }) => {
  let slug = params.slug;
  (0, import_tiny_invariant3.default)(slug, "slug is required");
  let user = await getUser(request), projectId2 = user == null ? void 0 : user.currentProjectId;
  (0, import_tiny_invariant3.default)(typeof projectId2 == "string", "user must have a current project");
  let content = await getContent({
    slug,
    projectId: projectId2
  });
  return (0, import_node7.json)({ content });
}, action2 = async ({ request }) => {
  let user = await getUser(request);
  (0, import_tiny_invariant3.default)(user == null ? void 0 : user.currentProjectId, "user must have a current project");
  let uploadHandler = (0, import_node7.unstable_composeUploadHandlers)(
    (0, import_node7.unstable_createFileUploadHandler)({
      maxPartSize: 5e8,
      file: ({ filename }) => filename
    }),
    (0, import_node7.unstable_createMemoryUploadHandler)()
  ), formData = await (0, import_node7.unstable_parseMultipartFormData)(
    request,
    uploadHandler
  ), slug = formData.get("slug"), thumbnail = formData.get("thumbnail");
  (0, import_tiny_invariant3.default)(typeof slug == "string", "slug is required"), (0, import_tiny_invariant3.default)(thumbnail, "thumbnail is required");
  let [bucket] = await storage.bucket(user.currentProjectId).exists();
  return bucket || await storage.createBucket(user.currentProjectId), storage.bucket(user.currentProjectId).upload(thumbnail.filepath, {
    destination: `${slug}.jpg`,
    public: !0
  }), await upsertContent({
    slug: slug.toString(),
    projectId: user.currentProjectId,
    thumbnail: `${slug}.jpg`
  }), (0, import_node7.redirect)(Routes.AdminContenVideo(slug));
};
function Page4() {
  let { content } = (0, import_react6.useLoaderData)(), transition = (0, import_react6.useTransition)(), disabled = transition.state === "loading" || transition.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h1", { children: [
      "Draft Post: ",
      content.title
    ] }, void 0, !0, {
      fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { children: "Upload Thubmnail" }, void 0, !1, {
      fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("fieldset", { disabled, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react6.Form, { method: "post", encType: "multipart/form-data", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("label", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        "input",
        {
          type: "file",
          name: "thumbnail",
          required: !0,
          style: {
            width: "100%"
          }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
          lineNumber: 106,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { type: "hidden", name: "slug", value: content.slug }, void 0, !1, {
        fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        "button",
        {
          type: "submit",
          style: {
            width: "100%",
            marginBlockStart: "8px"
          },
          children: "Next"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
          lineNumber: 116,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
      lineNumber: 104,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin/content/thumbnail/$slug.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}

// app/routes/admin/content/preview/$slug.tsx
var slug_exports2 = {};
__export(slug_exports2, {
  default: () => Page5,
  loader: () => loader6
});
var import_tiny_invariant4 = __toESM(require("tiny-invariant")), import_node8 = require("@remix-run/node"), import_react7 = require("@remix-run/react");
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), loader6 = async ({ params, request }) => {
  let slug = params.slug;
  (0, import_tiny_invariant4.default)(slug, "slug is required");
  let user = await getUser(request);
  return (0, import_tiny_invariant4.default)(user == null ? void 0 : user.currentProjectId, "user must have a current project"), (0, import_node8.json)({
    user,
    content: await getContent({
      slug,
      projectId: user.currentProjectId
    })
  });
};
function Page5() {
  let { content } = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h1", { children: content.title }, void 0, !1, {
      fileName: "app/routes/admin/content/preview/$slug.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr" }, children: [
      content.video ? /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        "video",
        {
          src: `https://storage.googleapis.com/${content.projectId}/${content.slug}.mp4`,
          controls: !0,
          style: { width: "100%" },
          autoPlay: !0,
          muted: !0
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin/content/preview/$slug.tsx",
          lineNumber: 40,
          columnNumber: 11
        },
        this
      ) : null,
      content.thumbnail ? /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        "img",
        {
          src: `https://storage.googleapis.com/${content.projectId}/${content.slug}.jpg`,
          alt: content.title,
          style: { width: "100%", position: "sticky", top: "0" }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin/content/preview/$slug.tsx",
          lineNumber: 49,
          columnNumber: 11
        },
        this
      ) : null
    ] }, void 0, !0, {
      fileName: "app/routes/admin/content/preview/$slug.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin/content/preview/$slug.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/routes/authorize-integration/index.tsx
var authorize_integration_exports = {};
__export(authorize_integration_exports, {
  default: () => Page6
});
var import_react8 = require("@remix-run/react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function Page6() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h1", { children: "Authorize Integration" }, void 0, !1, {
      fileName: "app/routes/authorize-integration/index.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react8.Link, { to: "youtube", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: "YouTube" }, void 0, !1, {
        fileName: "app/routes/authorize-integration/index.tsx",
        lineNumber: 9,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/authorize-integration/index.tsx",
        lineNumber: 8,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react8.Link, { to: "tik-tok", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: "Tik Tok" }, void 0, !1, {
        fileName: "app/routes/authorize-integration/index.tsx",
        lineNumber: 12,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/authorize-integration/index.tsx",
        lineNumber: 11,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react8.Link, { to: "facebook-and-instagram", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: "Facebook and Instagram" }, void 0, !1, {
        fileName: "app/routes/authorize-integration/index.tsx",
        lineNumber: 15,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/authorize-integration/index.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/authorize-integration/index.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/authorize-integration/index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/admin/content/title/index.tsx
var title_exports = {};
__export(title_exports, {
  action: () => action3,
  default: () => Page7
});
var import_react9 = require("@remix-run/react"), import_node9 = require("@remix-run/node");
var import_tiny_invariant5 = __toESM(require("tiny-invariant")), import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), action3 = async ({ request }) => {
  let title = (await request.formData()).get("title");
  (0, import_tiny_invariant5.default)(typeof title == "string", "title is required");
  let user = await getUser(request);
  if (!(user != null && user.currentProjectId))
    return (0, import_node9.redirect)(Routes.AdminCreateProject);
  let slug = title.toString().trim().toLowerCase().replace(/ /g, "-");
  return await upsertContent({
    slug,
    title: title.toString().trim(),
    projectId: user.currentProjectId
  }), (0, import_node9.redirect)(Routes.AdminContentThumbnail(slug));
};
function Page7() {
  let transition = (0, import_react9.useTransition)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
    "fieldset",
    {
      disabled: transition.state === "loading" || transition.state === "submitting",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h2", { children: "Create a New Post" }, void 0, !1, {
          fileName: "app/routes/admin/content/title/index.tsx",
          lineNumber: 42,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react9.Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("label", { children: [
            "Title",
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("br", {}, void 0, !1, {
              fileName: "app/routes/admin/content/title/index.tsx",
              lineNumber: 46,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
              "input",
              {
                type: "text",
                name: "title",
                required: !0,
                style: {
                  width: "calc(100% - 8px)",
                  marginBlockStart: "8px"
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/admin/content/title/index.tsx",
                lineNumber: 47,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/admin/content/title/index.tsx",
            lineNumber: 44,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
            "button",
            {
              type: "submit",
              style: {
                width: "100%",
                marginBlockStart: "16px"
              },
              children: "Next"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/admin/content/title/index.tsx",
              lineNumber: 57,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/admin/content/title/index.tsx",
          lineNumber: 43,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/admin/content/title/index.tsx",
      lineNumber: 37,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/admin/content/title/index.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/routes/admin/content/video/$slug.tsx
var slug_exports3 = {};
__export(slug_exports3, {
  action: () => action4,
  default: () => Page8,
  loader: () => loader7
});
var import_node10 = require("@remix-run/node"), import_react10 = require("@remix-run/react"), import_tiny_invariant6 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), loader7 = async ({ params, request }) => {
  let slug = params.slug;
  (0, import_tiny_invariant6.default)(slug, "slug is required");
  let user = await getUser(request), projectId2 = user == null ? void 0 : user.currentProjectId;
  (0, import_tiny_invariant6.default)(typeof projectId2 == "string", "user must have a current project");
  let content = await getContent({
    slug,
    projectId: projectId2
  });
  return (0, import_node10.json)({ content });
}, action4 = async ({ request }) => {
  let user = await getUser(request);
  (0, import_tiny_invariant6.default)(user == null ? void 0 : user.currentProjectId, "user must have a current project");
  let uploadHandler = (0, import_node10.unstable_composeUploadHandlers)(
    (0, import_node10.unstable_createFileUploadHandler)({
      maxPartSize: 5e8,
      file: ({ filename }) => filename
    }),
    (0, import_node10.unstable_createMemoryUploadHandler)()
  ), formData = await (0, import_node10.unstable_parseMultipartFormData)(
    request,
    uploadHandler
  ), slug = formData.get("slug"), video = formData.get("video");
  (0, import_tiny_invariant6.default)(typeof slug == "string", "slug is required"), (0, import_tiny_invariant6.default)(video, "video is required");
  let [bucket] = await storage.bucket(user.currentProjectId).exists();
  return bucket || await storage.createBucket(user.currentProjectId), storage.bucket(user.currentProjectId).upload(video.filepath, {
    destination: `${slug}.mp4`,
    public: !0
  }), await upsertContent({
    slug: slug.toString(),
    projectId: user.currentProjectId,
    video: `${slug}.mp4`
  }), pubsub.topic("process-content-video").publishMessage({
    json: { slug, projectId: user.currentProjectId }
  }), (0, import_node10.redirect)(Routes.AdminContentPreview(slug));
};
function Page8() {
  let { content } = (0, import_react10.useLoaderData)(), transition = (0, import_react10.useTransition)(), disabled = transition.state === "loading" || transition.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", { children: [
      "Draft Post: ",
      content.title
    ] }, void 0, !0, {
      fileName: "app/routes/admin/content/video/$slug.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
      "img",
      {
        alt: content.title,
        src: `https://storage.googleapis.com/${content.projectId}/${content.slug}.jpg`
      },
      void 0,
      !1,
      {
        fileName: "app/routes/admin/content/video/$slug.tsx",
        lineNumber: 105,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h2", { children: "Upload Video" }, void 0, !1, {
      fileName: "app/routes/admin/content/video/$slug.tsx",
      lineNumber: 109,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("fieldset", { disabled, children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react10.Form, { method: "post", encType: "multipart/form-data", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { children: "Video" }, void 0, !1, {
          fileName: "app/routes/admin/content/video/$slug.tsx",
          lineNumber: 113,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/admin/content/video/$slug.tsx",
          lineNumber: 114,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          "input",
          {
            type: "file",
            name: "video",
            required: !0,
            style: { width: "100%" }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin/content/video/$slug.tsx",
            lineNumber: 115,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin/content/video/$slug.tsx",
        lineNumber: 112,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("input", { type: "hidden", name: "slug", value: content.slug }, void 0, !1, {
        fileName: "app/routes/admin/content/video/$slug.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
        "button",
        {
          type: "submit",
          style: { width: "100%", position: "sticky", bottom: 0 },
          children: "Next"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin/content/video/$slug.tsx",
          lineNumber: 123,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/admin/content/video/$slug.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/admin/content/video/$slug.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin/content/video/$slug.tsx",
    lineNumber: 103,
    columnNumber: 5
  }, this);
}

// app/routes/admin/create-project.tsx
var create_project_exports = {};
__export(create_project_exports, {
  action: () => action5,
  default: () => Page9,
  loader: () => loader8
});
var import_react11 = require("@remix-run/react"), import_node11 = require("@remix-run/node"), import_tiny_invariant7 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), loader8 = async ({ request }) => await getUser(request) ? null : (0, import_node11.redirect)(Routes.Login), action5 = async ({ request }) => {
  let user = await getUser(request);
  if (!user)
    return (0, import_node11.redirect)(Routes.Login);
  let name = (await request.formData()).get("name");
  (0, import_tiny_invariant7.default)(name, "Project name is required");
  let project = await prisma.project.create({
    data: {
      title: name.toString().trim(),
      user: {
        connect: {
          id: user.id
        }
      }
    }
  });
  return await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      currentProjectId: project.id
    }
  }), (0, import_node11.redirect)(Routes.Admin);
};
function Page9() {
  let transition = (0, import_react11.useTransition)(), disabled = transition.state === "loading" || transition.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("fieldset", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("legend", { children: "Create a New Project" }, void 0, !1, {
      fileName: "app/routes/admin/create-project.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("fieldset", { disabled, children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_react11.Form, { method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("label", { htmlFor: "name", children: "Project Name" }, void 0, !1, {
        fileName: "app/routes/admin/create-project.tsx",
        lineNumber: 63,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/admin/create-project.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
        "input",
        {
          type: "text",
          id: "name",
          name: "name",
          style: {
            width: "calc(100% - 8px)"
          }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin/create-project.tsx",
          lineNumber: 65,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
        "button",
        {
          type: "submit",
          style: {
            width: "100%",
            marginBlockStart: "16px"
          },
          children: "Create Project"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin/create-project.tsx",
          lineNumber: 73,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/admin/create-project.tsx",
      lineNumber: 62,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/admin/create-project.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin/create-project.tsx",
    lineNumber: 59,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/admin/create-project.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}

// app/routes/shop-products/$slug.tsx
var slug_exports4 = {};
__export(slug_exports4, {
  default: () => ShopProductsProductPage
});
function ShopProductsProductPage() {
  return null;
}

// app/routes/shop-products/index.tsx
var shop_products_exports = {};
__export(shop_products_exports, {
  action: () => action6,
  default: () => ShopProductsPage,
  loader: () => loader9
});
var import_stripe = require("stripe"), import_node12 = require("@remix-run/node"), import_react12 = require("@remix-run/react"), import_jsx_dev_runtime12 = require("react/jsx-dev-runtime"), loader9 = async () => {
  let stripeAPI = new import_stripe.Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15"
  }), productIds = ["prod_MtQoCyebAF3pOc"], products = await Promise.all(
    productIds.map(async (productId) => await stripeAPI.products.retrieve(productId))
  );
  return (0, import_node12.json)({
    products
  });
}, action6 = async () => null;
function ShopProductsPage() {
  let data = (0, import_react12.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", { children: "Shop Products" }, void 0, !1, {
      fileName: "app/routes/shop-products/index.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("ul", { children: data.products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_react12.Link, { to: `${product.id}`, children: product.name }, void 0, !1, {
      fileName: "app/routes/shop-products/index.tsx",
      lineNumber: 49,
      columnNumber: 13
    }, this) }, product.id, !1, {
      fileName: "app/routes/shop-products/index.tsx",
      lineNumber: 48,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/shop-products/index.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/shop-products/index.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}

// app/routes/admin/index.tsx
var admin_exports = {};
__export(admin_exports, {
  action: () => action7,
  default: () => Page10,
  loader: () => loader10
});
var import_node13 = require("@remix-run/node"), import_react13 = require("@remix-run/react");
var import_client2 = require("@prisma/client"), import_compact = __toESM(require("lodash/compact"));

// app/models/chanel.server.ts
async function getChannel(params) {
  let { projectId: projectId2, channelType } = params;
  return prisma.channel.findUnique({
    where: {
      projectId_channelType: {
        projectId: projectId2,
        channelType
      }
    },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: !0
            }
          }
        }
      }
    }
  });
}

// app/routes/admin/index.tsx
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime"), loader10 = async ({ request }) => {
  let user = await getUser(request);
  return user != null && user.id ? user.currentProjectId ? (0, import_node13.json)({
    user,
    contents: await getContents({
      projectId: user.currentProjectId
    }),
    youtube: await getChannel({
      projectId: user.currentProjectId,
      channelType: import_client2.ChannelType.YOUTUBE
    }),
    tiktok: await getChannel({
      projectId: user.currentProjectId,
      channelType: import_client2.ChannelType.TIKTOK
    }),
    instagram: await getChannel({
      projectId: user.currentProjectId,
      channelType: import_client2.ChannelType.INSTAGRAM
    }),
    facebook: await getChannel({
      projectId: user.currentProjectId,
      channelType: import_client2.ChannelType.FACEBOOK
    }),
    twitter: await getChannel({
      projectId: user.currentProjectId,
      channelType: import_client2.ChannelType.TWITTER
    })
  }) : (0, import_node13.redirect)(Routes.AdminCreateProject) : (0, import_node13.redirect)(Routes.Login);
}, action7 = async ({ request }) => {
  let formData = await request.formData(), currentProjectId = formData.get("currentProjectId"), userId = formData.get("userId");
  return !currentProjectId || !userId ? (0, import_node13.redirect)(Routes.Admin) : prisma.user.update({
    where: {
      id: userId.toString()
    },
    data: {
      currentProjectId: currentProjectId.toString()
    }
  });
};
function Page10() {
  let { user, youtube, tiktok, instagram, facebook, twitter } = (0, import_react13.useLoaderData)(), submit = (0, import_react13.useSubmit)();
  return user ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("fieldset", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { children: "Current Project" }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 98,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react13.Form, { method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("label", { htmlFor: "currentProjectId", children: "Selected:" }, void 0, !1, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 101,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "select",
          {
            id: "currentProjectId",
            name: "currentProjectId",
            style: {
              width: "100%",
              marginBlockStart: "8px"
            },
            onChange: (event) => {
              submit(
                {
                  currentProjectId: event.target.value,
                  userId: user.id
                },
                {
                  method: "post"
                }
              );
            },
            children: user == null ? void 0 : user.projects.map((project) => /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
              "option",
              {
                value: project.id,
                selected: project.id === user.currentProjectId,
                children: project.title
              },
              project.id,
              !1,
              {
                fileName: "app/routes/admin/index.tsx",
                lineNumber: 122,
                columnNumber: 15
              },
              this
            ))
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin/index.tsx",
            lineNumber: 102,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 97,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
      ChannelsGrid,
      {
        channels: (0, import_compact.default)([
          youtube ? {
            channelType: import_client2.ChannelType.YOUTUBE,
            name: youtube.name,
            views: youtube.views || 0,
            subscribers: youtube.subscribers || 0
          } : {
            channelType: import_client2.ChannelType.YOUTUBE,
            href: Routes.AuthorizeYoutube
          },
          tiktok ? {
            channelType: import_client2.ChannelType.TIKTOK,
            name: tiktok.name,
            views: tiktok.views || 0,
            subscribers: tiktok.subscribers || 0
          } : {
            channelType: import_client2.ChannelType.TIKTOK,
            href: Routes.AuthorizeTikTok
          },
          instagram ? {
            channelType: import_client2.ChannelType.INSTAGRAM,
            name: instagram.name,
            views: instagram.views || 0,
            subscribers: instagram.subscribers || 0
          } : {
            channelType: import_client2.ChannelType.INSTAGRAM,
            href: Routes.AuthorizeInstagram
          },
          facebook ? {
            channelType: import_client2.ChannelType.FACEBOOK,
            name: facebook.name,
            views: facebook.views || 0,
            subscribers: facebook.subscribers || 0
          } : {
            channelType: import_client2.ChannelType.FACEBOOK,
            href: Routes.AuthorizeFacebook
          },
          twitter ? {
            channelType: import_client2.ChannelType.TWITTER,
            name: twitter.name,
            views: twitter.views || 0,
            subscribers: twitter.subscribers || 0
          } : {
            channelType: import_client2.ChannelType.TWITTER,
            href: Routes.AuthorizeTwitter
          }
        ])
      },
      void 0,
      !1,
      {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 133,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react13.Link, { to: Routes.AdminCreateProject, children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { children: "New Project" }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 193,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 192,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react13.Link, { to: Routes.Logout, children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { children: "Logout" }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 196,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 195,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 96,
    columnNumber: 5
  }, this) : null;
}
function ChannelsGrid({ channels }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
    "section",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "16px"
      },
      children: channels == null ? void 0 : channels.map((channel) => /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(ChannelItem, { channel }, channel.channelType, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 220,
        columnNumber: 11
      }, this))
    },
    void 0,
    !1,
    {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 212,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 211,
    columnNumber: 5
  }, this);
}
function ChannelItem({ channel }) {
  return "href" in channel && channel.href ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react13.Link, { to: channel.href, children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { children: [
    "ADD ",
    channel.channelType
  ] }, void 0, !0, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 230,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 229,
    columnNumber: 5
  }, this) : "name" in channel ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { children: channel.channelType }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 234,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h4", { children: channel.name }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 235,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("li", { children: `${channel.views} views` }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 237,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("li", { children: `${channel.subscribers} subscribers` }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 238,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 236,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 233,
    columnNumber: 5
  }, this) : null;
}

// app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader11
});
async function loader11({ request }) {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    let url = new URL("/", `http://${host}`);
    return await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]), new Response("OK");
  } catch (error) {
    return console.log("healthcheck \u274C", { error }), new Response("ERROR", { status: 500 });
  }
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action8,
  loader: () => loader12
});
var import_node14 = require("@remix-run/node");
async function action8({ request }) {
  return logout(request);
}
async function loader12() {
  return (0, import_node14.redirect)("/");
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Page11,
  loader: () => loader13
});
var import_node15 = require("@remix-run/node"), import_react14 = require("@remix-run/react");
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), loader13 = async ({ request }) => {
  let user = await getUser(request);
  return user != null && user.id ? user.currentProjectId ? (0, import_node15.json)({
    contents: await getContents({
      projectId: user.currentProjectId
    })
  }) : (0, import_node15.redirect)(Routes.AdminCreateProject) : (0, import_node15.redirect)(Routes.Login);
};
function Page11() {
  let { contents } = (0, import_react14.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("ul", { children: contents == null ? void 0 : contents.map((content) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react14.Link, { to: Routes.AdminContentPreview(content.slug), children: `${content.published ? `${content.title}` : `Draft - ${content.title}`}` }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 39,
    columnNumber: 13
  }, this) }, content.slug, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 38,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 36,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action9,
  default: () => Page12,
  loader: () => loader14,
  meta: () => meta2
});
var import_node16 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), React = __toESM(require("react"));

// app/utils.ts
var import_react15 = require("@remix-run/react"), import_react16 = require("react"), DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}

// app/routes/login.tsx
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
async function loader14({ request }) {
  return await getUserId(request) ? (0, import_node16.redirect)("/") : (0, import_node16.json)({});
}
async function action9({ request }) {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/notes"), remember = formData.get("remember");
  if (!validateEmail(email))
    return (0, import_node16.json)(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node16.json)(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node16.json)(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  return user ? createUserSession({
    request,
    userId: user.id,
    remember: remember === "on",
    redirectTo
  }) : (0, import_node16.json)(
    { errors: { email: "Invalid email or password", password: null } },
    { status: 400 }
  );
}
var meta2 = () => ({
  title: "Login"
});
function Page12() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react17.useSearchParams)(), redirectTo = searchParams.get("redirectTo") || "/notes", actionData = (0, import_react17.useActionData)(), emailRef = React.useRef(null), passwordRef = React.useRef(null), transition = (0, import_react17.useTransition)();
  React.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email ? (_b2 = emailRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef.current) == null || _d2.focus());
  }, [actionData]);
  let disabled = transition.state === "loading" || transition.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h1", { children: "Login" }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 95,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("fieldset", { disabled, children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_react17.Form, { method: "post", className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          "label",
          {
            htmlFor: "email",
            className: "block text-sm font-medium text-gray-700",
            children: "Email address"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 100,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            "input",
            {
              ref: emailRef,
              id: "email",
              required: !0,
              autoFocus: !0,
              name: "email",
              type: "email",
              autoComplete: "email",
              "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.email ? !0 : void 0,
              "aria-describedby": "email-error",
              className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 107,
              columnNumber: 17
            },
            this
          ),
          ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { style: { color: "palevioletred" }, id: "email-error", children: actionData.errors.email }, void 0, !1, {
            fileName: "app/routes/login.tsx",
            lineNumber: 120,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 106,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          "label",
          {
            htmlFor: "password",
            className: "block text-sm font-medium text-gray-700",
            children: "Password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 127,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            "input",
            {
              id: "password",
              ref: passwordRef,
              name: "password",
              type: "password",
              autoComplete: "current-password",
              "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.password ? !0 : void 0,
              "aria-describedby": "password-error",
              className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 134,
              columnNumber: 17
            },
            this
          ),
          ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            "div",
            {
              style: {
                color: "palevioletred"
              },
              id: "password-error",
              children: actionData.errors.password
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 145,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 133,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 126,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 156,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 157,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            "input",
            {
              id: "remember",
              name: "remember",
              type: "checkbox",
              className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 165,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            "label",
            {
              htmlFor: "remember",
              className: "ml-2 block text-sm text-gray-900",
              children: "Remember me"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 171,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 164,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            import_react17.Link,
            {
              className: "text-blue-500 underline",
              to: {
                pathname: "/join",
                search: searchParams.toString()
              },
              children: "Sign up"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 180,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 178,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 163,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 98,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 97,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 96,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 94,
    columnNumber: 5
  }, this);
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action10,
  default: () => Page13,
  loader: () => loader15,
  meta: () => meta3
});
var import_node17 = require("@remix-run/node"), import_react18 = require("@remix-run/react"), React2 = __toESM(require("react"));
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime");
async function loader15({ request }) {
  return await getUserId(request) ? (0, import_node17.redirect)("/") : (0, import_node17.json)({});
}
async function action10({ request }) {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  if (!validateEmail(email))
    return (0, import_node17.json)(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node17.json)(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node17.json)(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  if (await getUserByEmail(email))
    return (0, import_node17.json)(
      {
        errors: {
          email: "A user already exists with this email",
          password: null
        }
      },
      { status: 400 }
    );
  let user = await createUser(email, password);
  return createUserSession({
    request,
    userId: user.id,
    remember: !1,
    redirectTo
  });
}
var meta3 = () => ({
  title: "Sign Up"
});
function Page13() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react18.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react18.useActionData)(), emailRef = React2.useRef(null), passwordRef = React2.useRef(null), transition = (0, import_react18.useTransition)();
  React2.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email ? (_b2 = emailRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef.current) == null || _d2.focus());
  }, [actionData]);
  let disabled = transition.state === "loading" || transition.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("fieldset", { disabled, children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_react18.Form, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-gray-700",
          children: "Email address"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 105,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          "input",
          {
            ref: emailRef,
            id: "email",
            required: !0,
            autoFocus: !0,
            name: "email",
            type: "email",
            autoComplete: "email",
            "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.email ? !0 : void 0,
            "aria-describedby": "email-error",
            className: "input"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 112,
            columnNumber: 17
          },
          this
        ),
        ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 125,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 111,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 104,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-gray-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 132,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "new-password",
            "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "input"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 139,
            columnNumber: 17
          },
          this
        ),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 150,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 138,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 131,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 156,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Create Account"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/join.tsx",
        lineNumber: 157,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        import_react18.Link,
        {
          className: "text-blue-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 166,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 164,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 163,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 103,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 102,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 101,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-C67Y4DZB.js", imports: ["/build/_shared/chunk-LIPPVQVX.js", "/build/_shared/chunk-56N63P4Z.js", "/build/_shared/chunk-DVY6DM36.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-EQ7FZKFC.js", imports: ["/build/_shared/chunk-SVLADG3Q.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/content/preview/$slug": { id: "routes/admin/content/preview/$slug", parentId: "root", path: "admin/content/preview/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/content/preview/$slug-LBP7KAVH.js", imports: ["/build/_shared/chunk-GUARJ323.js", "/build/_shared/chunk-HTZQNGLJ.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/content/thumbnail/$slug": { id: "routes/admin/content/thumbnail/$slug", parentId: "root", path: "admin/content/thumbnail/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/content/thumbnail/$slug-YDCN3GO7.js", imports: ["/build/_shared/chunk-WTN27XAD.js", "/build/_shared/chunk-GUARJ323.js", "/build/_shared/chunk-HTZQNGLJ.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/content/title/index": { id: "routes/admin/content/title/index", parentId: "root", path: "admin/content/title", index: !0, caseSensitive: void 0, module: "/build/routes/admin/content/title/index-4KR5H6UM.js", imports: ["/build/_shared/chunk-GUARJ323.js", "/build/_shared/chunk-HTZQNGLJ.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/content/video/$slug": { id: "routes/admin/content/video/$slug", parentId: "root", path: "admin/content/video/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/content/video/$slug-VEJLGF6Z.js", imports: ["/build/_shared/chunk-WTN27XAD.js", "/build/_shared/chunk-GUARJ323.js", "/build/_shared/chunk-HTZQNGLJ.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/create-project": { id: "routes/admin/create-project", parentId: "root", path: "admin/create-project", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/create-project-5WFGKB7T.js", imports: ["/build/_shared/chunk-JRG6CC6I.js", "/build/_shared/chunk-HTZQNGLJ.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/index": { id: "routes/admin/index", parentId: "root", path: "admin", index: !0, caseSensitive: void 0, module: "/build/routes/admin/index-TUUZN6AZ.js", imports: ["/build/_shared/chunk-JRG6CC6I.js", "/build/_shared/chunk-GUARJ323.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/authorize-integration/facebook-and-instagram/index": { id: "routes/authorize-integration/facebook-and-instagram/index", parentId: "root", path: "authorize-integration/facebook-and-instagram", index: !0, caseSensitive: void 0, module: "/build/routes/authorize-integration/facebook-and-instagram/index-QGGJONO5.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/authorize-integration/index": { id: "routes/authorize-integration/index", parentId: "root", path: "authorize-integration", index: !0, caseSensitive: void 0, module: "/build/routes/authorize-integration/index-4V6YUVRO.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/authorize-integration/tik-tok/index": { id: "routes/authorize-integration/tik-tok/index", parentId: "root", path: "authorize-integration/tik-tok", index: !0, caseSensitive: void 0, module: "/build/routes/authorize-integration/tik-tok/index-64JWWZAY.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/authorize-integration/tik-tok/success": { id: "routes/authorize-integration/tik-tok/success", parentId: "root", path: "authorize-integration/tik-tok/success", index: void 0, caseSensitive: void 0, module: "/build/routes/authorize-integration/tik-tok/success-SF5GWHWG.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/authorize-integration/youtube/index": { id: "routes/authorize-integration/youtube/index", parentId: "root", path: "authorize-integration/youtube", index: !0, caseSensitive: void 0, module: "/build/routes/authorize-integration/youtube/index-3CRPIU7O.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/authorize-integration/youtube/success": { id: "routes/authorize-integration/youtube/success", parentId: "root", path: "authorize-integration/youtube/success", index: void 0, caseSensitive: void 0, module: "/build/routes/authorize-integration/youtube/success-5UFHSJ3P.js", imports: ["/build/_shared/chunk-U6E66W3Y.js", "/build/_shared/chunk-JRG6CC6I.js", "/build/_shared/chunk-HTZQNGLJ.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/healthcheck": { id: "routes/healthcheck", parentId: "root", path: "healthcheck", index: void 0, caseSensitive: void 0, module: "/build/routes/healthcheck-EYBR3ZKW.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-JVESPQQY.js", imports: ["/build/_shared/chunk-GUARJ323.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-ZBMLX2ZL.js", imports: ["/build/_shared/chunk-YSJVIC6P.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-ETQGFM63.js", imports: ["/build/_shared/chunk-YSJVIC6P.js", "/build/_shared/chunk-HLAKAEKM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-4KHUARF6.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/shop-products/$slug": { id: "routes/shop-products/$slug", parentId: "root", path: "shop-products/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/shop-products/$slug-HKBPA4CM.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/shop-products/index": { id: "routes/shop-products/index", parentId: "root", path: "shop-products", index: !0, caseSensitive: void 0, module: "/build/routes/shop-products/index-AJH2FZLX.js", imports: ["/build/_shared/chunk-U6E66W3Y.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, version: "aaf8491f", hmr: void 0, url: "/build/manifest-AAF8491F.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !1, v2_meta: !1, v2_normalizeFormMethod: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/authorize-integration/facebook-and-instagram/index": {
    id: "routes/authorize-integration/facebook-and-instagram/index",
    parentId: "root",
    path: "authorize-integration/facebook-and-instagram",
    index: !0,
    caseSensitive: void 0,
    module: facebook_and_instagram_exports
  },
  "routes/authorize-integration/tik-tok/success": {
    id: "routes/authorize-integration/tik-tok/success",
    parentId: "root",
    path: "authorize-integration/tik-tok/success",
    index: void 0,
    caseSensitive: void 0,
    module: success_exports
  },
  "routes/authorize-integration/youtube/success": {
    id: "routes/authorize-integration/youtube/success",
    parentId: "root",
    path: "authorize-integration/youtube/success",
    index: void 0,
    caseSensitive: void 0,
    module: success_exports2
  },
  "routes/authorize-integration/tik-tok/index": {
    id: "routes/authorize-integration/tik-tok/index",
    parentId: "root",
    path: "authorize-integration/tik-tok",
    index: !0,
    caseSensitive: void 0,
    module: tik_tok_exports
  },
  "routes/authorize-integration/youtube/index": {
    id: "routes/authorize-integration/youtube/index",
    parentId: "root",
    path: "authorize-integration/youtube",
    index: !0,
    caseSensitive: void 0,
    module: youtube_exports
  },
  "routes/admin/content/thumbnail/$slug": {
    id: "routes/admin/content/thumbnail/$slug",
    parentId: "root",
    path: "admin/content/thumbnail/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/admin/content/preview/$slug": {
    id: "routes/admin/content/preview/$slug",
    parentId: "root",
    path: "admin/content/preview/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports2
  },
  "routes/authorize-integration/index": {
    id: "routes/authorize-integration/index",
    parentId: "root",
    path: "authorize-integration",
    index: !0,
    caseSensitive: void 0,
    module: authorize_integration_exports
  },
  "routes/admin/content/title/index": {
    id: "routes/admin/content/title/index",
    parentId: "root",
    path: "admin/content/title",
    index: !0,
    caseSensitive: void 0,
    module: title_exports
  },
  "routes/admin/content/video/$slug": {
    id: "routes/admin/content/video/$slug",
    parentId: "root",
    path: "admin/content/video/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports3
  },
  "routes/admin/create-project": {
    id: "routes/admin/create-project",
    parentId: "root",
    path: "admin/create-project",
    index: void 0,
    caseSensitive: void 0,
    module: create_project_exports
  },
  "routes/shop-products/$slug": {
    id: "routes/shop-products/$slug",
    parentId: "root",
    path: "shop-products/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports4
  },
  "routes/shop-products/index": {
    id: "routes/shop-products/index",
    parentId: "root",
    path: "shop-products",
    index: !0,
    caseSensitive: void 0,
    module: shop_products_exports
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "root",
    path: "admin",
    index: !0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
