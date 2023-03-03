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

  console.log(authorizationCode, "authorizationCode");

  if (!authorizationCode) {
    return redirect("/authorize-integration/youtube");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(authorizationCode);

  console.log(tokens, "tokens");

  oauth2Client.setCredentials(tokens);

  if (tokens.access_token) {
    await prisma.youtubeCredentials.upsert({
      where: {
        projectId: user.currentProjectId,
      },
      create: {
        accessToken: tokens.access_token,
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
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
    });
  }

  // oauth2Client.on("tokens", async (tokens) => {
  //   if (tokens.refresh_token && user.currentProjectId) {
  //     await prisma.youtubeCredentials.upsert({
  //       where: {
  //         projectId: user.currentProjectId,
  //       },
  //       create: {
  //         refreshToken: tokens.refresh_token,
  //         user: {
  //           connect: {
  //             id: user.id,
  //           },
  //         },
  //         project: {
  //           connect: {
  //             id: user.currentProjectId,
  //           },
  //         },
  //       },
  //       update: {
  //         refreshToken: tokens.refresh_token,
  //       },
  //     });
  //   }
  // });

  return null;
};

export default function Page() {
  return (
    <main>
      <h1>Success</h1>
    </main>
  );
}
