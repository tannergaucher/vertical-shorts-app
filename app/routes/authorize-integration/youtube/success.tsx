import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { google } from "googleapis";

import { getUserId } from "~/session.server";
import { prisma } from "~/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  const url = new URL(request.url);
  const authorizationCode = url.searchParams.get("code");

  if (!authorizationCode) {
    return redirect("/authorize-integration");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  if (!user?.youtubeCredentials) {
    return redirect("/authorize-integration");
  }

  const oauth2Client = new google.auth.OAuth2(
    user.youtubeCredentials.clientId,
    user.youtubeCredentials.clientSecret
  );

  const { tokens } = await oauth2Client.getToken(authorizationCode);

  oauth2Client.setCredentials(tokens);

  if (tokens.access_token) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        youtubeCredentials: {
          update: {
            accessToken: tokens.access_token,
          },
        },
      },
    });
  }

  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.refresh_token) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          youtubeCredentials: {
            update: {
              refreshToken: tokens.refresh_token,
            },
          },
        },
      });
    }
  });
};

export default function Page() {
  return (
    <main>
      <h1>Success</h1>
    </main>
  );
}
