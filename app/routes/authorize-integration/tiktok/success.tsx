import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { fetch } from "@remix-run/node";
import invariant from "tiny-invariant";

import { getUser } from "~/session.server";
import { Routes } from "~/routes";
import { useLoaderData } from "@remix-run/react";

/* 
In the loader function
1. Get the code from the query params
2. Fetch the access token from TikTok using the authorization code: https://open-api.tiktok.com/oauth/access_token/
3. Store the access token and associated values in the database
*/

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

  return json(response.json());
};

export default function Page() {
  const data = useLoaderData();

  console.log(data);

  return (
    <>
      <h1>Success!</h1>
    </>
  );
}
