import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { google } from "googleapis";

import { getUserId } from "~/session.server";
import { prisma } from "~/db.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request);

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  const scopes = ["https://www.googleapis.com/auth/youtube.upload"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    redirect_uri: "http://localhost:3000/authorize-integration/youtube/success",
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
