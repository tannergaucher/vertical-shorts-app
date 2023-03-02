import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { google } from "googleapis";

import { getUserId } from "~/session.server";
import { prisma } from "~/db.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request);

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
    user.youtubeCredentials.clientSecret,
    "http://localhost:3000/authorize-integration/youtube/success"
  );

  const scopes = [`/www.googleapis.com/auth/youtube.upload`];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  return redirect(url);
};

export default function Page() {
  return (
    <main>
      <Form method="post">
        <button type="submit">Authorize Youtube</button>
      </Form>
    </main>
  );
}
