import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { fetch } from "@remix-run/node";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  invariant(
    typeof user.currentProjectId === "string",
    "Current project is required"
  );

  const url = new URL(request.url);
  const authorizationCode = url.searchParams.get("code");

  if (!authorizationCode) {
    return redirect("/authorize-integration/tiktok");
  }

  const response = await fetch(
    "https://open-api.tiktok.com/oauth/access_token/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code: authorizationCode,
        grant_type: "authorization_code",
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();

    const channelResponse = await fetch(
      `https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count`,
      {
        headers: {
          Authorization: `Bearer ${data.data.access_token}`,
        },
      }
    );

    const channelResponseData = await channelResponse.json();

    console.log(channelResponseData, "channelResponseData");

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
                    accessToken: data.data.access_token,
                    refreshToken: data.data.refresh_token,
                    refreshTokenExpiresIn: data.data.refresh_expires_in,
                    scope: data.data.scope,
                    openId: data.data.open_id,
                  },
                  update: {
                    accessToken: data.data.access_token,
                    refreshToken: data.data.refresh_token,
                    refreshTokenExpiresIn: data.data.refresh_expires_in,
                    scope: data.data.scope,
                    openId: data.data.open_id,
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
                  },
                  update: {
                    name: channelResponseData.data.user.display_name,
                    subscribers: channelResponseData.data.user.follower_count,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  return redirect(Routes.Admin);
};
