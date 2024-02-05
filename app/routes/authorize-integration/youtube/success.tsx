import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { google } from "googleapis";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
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
    return redirect("/authorize-integration/youtube");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(authorizationCode);

  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  const { data } = await youtube.channels.list({
    part: ["snippet", "contentDetails", "statistics"],
    mine: true,
  });

  const snippet = data?.items?.[0].snippet;
  const statistics = data.items?.[0].statistics;

  if (tokens.access_token && user.currentProjectId) {
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
              youtubeCredentials: {
                upsert: {
                  create: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                  },
                  update: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                  },
                },
              },
              channels: {
                upsert: {
                  where: {
                    projectId_channelType: {
                      projectId: user.currentProjectId,
                      channelType: "YOUTUBE",
                    },
                  },
                  create: {
                    channelType: "YOUTUBE",
                    name: snippet?.title ?? "Untitled",
                    views: parseInt(statistics?.viewCount ?? "0", 10),
                    subscribers: parseInt(
                      statistics?.subscriberCount ?? "0",
                      10
                    ),
                    thumbnail: snippet?.thumbnails?.default?.url,
                  },
                  update: {
                    name: snippet?.title ?? "Untitled",
                    views: parseInt(statistics?.viewCount ?? "0", 10),
                    subscribers: parseInt(
                      statistics?.subscriberCount ?? "0",
                      10
                    ),
                    thumbnail: snippet?.thumbnails?.default?.url,
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
