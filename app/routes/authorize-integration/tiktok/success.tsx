import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { fetch } from "@remix-run/node";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

interface TikTokAccessTokenResponse {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
}

interface TikTokChannelResponse {
  data: {
    user: {
      avatar_url: string;
      display_name: string;
      follower_count: number;
      open_id: string;
      union_id: string;
    };
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

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

  const url = new URL(request.url);
  const authorizationCode = url.searchParams.get("code");

  if (!authorizationCode) {
    return redirect("/authorize-integration/tiktok");
  }

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

  const data = (await response.json()) as TikTokAccessTokenResponse;

  const channelResponse = await fetch(
    `https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count`,
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );

  const channelResponseData =
    (await channelResponse.json()) as TikTokChannelResponse;

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
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                  refreshTokenExpiresIn: data.refresh_expires_in,
                  scope: data.scope,
                  openId: data.open_id,
                  handle: channelResponseData.data.user.display_name,
                },
                update: {
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                  refreshTokenExpiresIn: data.refresh_expires_in,
                  scope: data.scope,
                  openId: data.open_id,
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
