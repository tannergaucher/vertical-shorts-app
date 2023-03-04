import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { google } from "googleapis";
import invariant from "tiny-invariant";

import { getUser } from "~/session.server";
import { prisma } from "~/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
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

  oauth2Client.on("tokens", async (tokens) => {
    console.log("_tokens", tokens);

    if (tokens.refresh_token && user.currentProjectId) {
      await prisma.youtubeCredentials.upsert({
        where: {
          projectId: user.currentProjectId,
        },
        create: {
          refreshToken: tokens.refresh_token,
          user: {
            connect: {
              id: user.id,
            },
          },
          project: {
            connect: {
              id: user.currentProjectId,
            },
          },
        },
        update: {
          refreshToken: tokens.refresh_token,
        },
      });
    }
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  const { data } = await youtube.channels.list({
    part: ["snippet", "contentDetails", "statistics"],
    mine: true,
  });

  const snippet = data?.items?.[0].snippet;
  // const contentDetails = data.items?.[0].contentDetails;
  const statistics = data.items?.[0].statistics;

  if (tokens.access_token && user.currentProjectId) {
    await prisma.project.update({
      where: {
        id: user.currentProjectId,
      },
      data: {
        youtubeCredentials: {
          upsert: {
            create: {
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
            update: {
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
            },
          },
        },
        channels: {
          upsert: [
            {
              where: {
                projectId: user.currentProjectId,
              },
              create: {
                integration: "YOUTUBE",
                name: snippet?.title ?? "Untitled",
                views: parseInt(statistics?.viewCount ?? "0"),
                subscribers: parseInt(statistics?.subscriberCount ?? "0"),
                thumbnail: snippet?.thumbnails?.default?.url,
              },
              update: {
                name: snippet?.title ?? "Untitled",
                views: parseInt(statistics?.viewCount ?? "0"),
                subscribers: parseInt(statistics?.subscriberCount ?? "0"),
                thumbnail: snippet?.thumbnails?.default?.url,
              },
            },
          ],
        },
      },
    });
  }

  return null;
};

export default function Page() {
  return (
    <main>
      <h1>Success</h1>
    </main>
  );
}
