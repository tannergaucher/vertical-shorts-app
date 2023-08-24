import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useLayoutEffect, useState } from "react";

import type { InstagramAuthResponse } from "~/models/instagram-credentials.server";
import { getUser } from "~/session.server";

type LoaderData = {
  projectId: string;
  userId: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (user?.currentProjectId) {
    return json<LoaderData>({
      projectId: user.currentProjectId,
      userId: user.id,
    });
  }
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const accessToken = formData.get("accessToken");

  console.log(accessToken, "_accessToken_");

  return null;
}

export default function Page() {
  const { userId } = useLoaderData<LoaderData>();

  const [authResponse, setAuthResponse] = useState<InstagramAuthResponse>(null);

  useLayoutEffect(() => {
    FB.init({
      appId: "6261998800593353",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v16.0",
    });

    FB.getLoginStatus(function (response) {
      console.log(response, "fb.getLoginStatus response");
      if (
        response.status === "connected" &&
        response.authResponse.accessToken
      ) {
        FB.login(
          function (response) {
            console.log("fb login status response", response);

            setAuthResponse({
              userId,
              accessToken: response.authResponse.accessToken,
              dataAccessExpirationTime:
                response.authResponse.data_access_expiration_time,
              expiresIn: response.authResponse.expiresIn,
              signedRequest: response.authResponse.signedRequest,
            });

            console.log(authResponse, "_authres");
          },
          // { scope: "instagram_content_publish" }
          { scope: "public_profile" }
        );
      }
    });
  }, [authResponse, userId]);

  useEffect(() => {
    FB.login(
      function (response) {
        console.log("fb.login response", response);
      },
      // { scope: "instagram_content_publish" }
      { scope: "public_profile" }
    );
  }, [authResponse]);

  return (
    <main>
      <h1>Authorize Instagram</h1>
      <Form method="post">
        <input
          type="hidden"
          name="accessToken"
          value={authResponse?.accessToken}
        />
        <button type="submit">LOGIN</button>
      </Form>
    </main>
  );
}
