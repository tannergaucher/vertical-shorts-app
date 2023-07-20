import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { fetch } from "@remix-run/node";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

interface TikTokAccessTokenSuccessResponse {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
}

interface TikTokChannelSuccessResponse {
  data: {
    user: {
      avatar_url: string;
      display_name: string;
      follower_count: number;
      open_id: string;
      union_id: string;
    };
  };
  error: {
    code: "ok";
  };
}

interface TikTokErrorResponse {
  error: string;
  error_description: string;
  log_id: string;
}

type TikTokAccessTokenResponse =
  | TikTokAccessTokenSuccessResponse
  | TikTokErrorResponse;

type TikTokChannelResponse = TikTokChannelSuccessResponse | TikTokErrorResponse;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  const url = new URL(request.url);
  const authorizationCode = url.searchParams.get("code");

  invariant(
    typeof authorizationCode === "string",
    "Authorization code is required"
  );
  invariant(
    typeof user.currentProjectId === "string",
    "Current project is required"
  );
  invariant(
    typeof process.env.TIKTOK_CLIENT_KEY === "string",
    "TikTok client key is required"
  );
  invariant(
    typeof process.env.TIKTOK_CLIENT_SECRET === "string",
    "TikTok client secret is required"
  );
  invariant(
    typeof process.env.TIKTOK_REDIRECT_URI === "string",
    "TikTok redirect URI is required"
  );

  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code: authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: process.env.TIKTOK_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching TikTok auth token: ${response.statusText}`);
  }

  const accessTokenData = (await response.json()) as TikTokAccessTokenResponse;

  if ("error" in accessTokenData) {
    throw new Error(
      `Error fetching TikTok auth token: ${accessTokenData.error_description}`
    );
  }

  const channelResponse = await fetch(
    `https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count`,
    {
      headers: {
        Authorization: `Bearer ${accessTokenData.access_token}`,
      },
    }
  );

  const channelResponseData =
    (await channelResponse.json()) as TikTokChannelResponse;

  if ("error_description" in channelResponseData) {
    throw new Error(
      `Error fetching TikTok channel: ${channelResponseData.error_description}`
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      projects: {
        update: {
          where: {
            id: user.currentProjectId,
          },
          data: {
            tikTokCredentials: {
              upsert: {
                create: {
                  accessToken: accessTokenData.access_token,
                  refreshToken: accessTokenData.refresh_token,
                  refreshTokenExpiresIn: accessTokenData.refresh_expires_in,
                  scope: accessTokenData.scope,
                  openId: accessTokenData.open_id,
                  handle: channelResponseData.data.user.display_name,
                },
                update: {
                  accessToken: accessTokenData.access_token,
                  refreshToken: accessTokenData.refresh_token,
                  refreshTokenExpiresIn: accessTokenData.refresh_expires_in,
                  scope: accessTokenData.scope,
                  openId: accessTokenData.open_id,
                  handle: channelResponseData.data.user.display_name,
                },
              },
            },
            channels: {
              upsert: {
                where: {
                  projectId_channelType: {
                    projectId: user.currentProjectId,
                    channelType: "TIKTOK",
                  },
                },
                create: {
                  channelType: "TIKTOK",
                  name: channelResponseData.data.user.display_name,
                  subscribers: channelResponseData.data.user.follower_count,
                  thumbnail: channelResponseData.data.user.avatar_url,
                },
                update: {
                  name: channelResponseData.data.user.display_name,
                  subscribers: channelResponseData.data.user.follower_count,
                  thumbnail: channelResponseData.data.user.avatar_url,
                },
              },
            },
          },
        },
      },
    },
  });

  return redirect(Routes.Admin);
};
