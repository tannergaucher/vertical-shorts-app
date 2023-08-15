import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useLayoutEffect, useState } from "react";

import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

type LoaderData = {
  projectId: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  return json({
    currentProjectId: user?.currentProjectId,
  });
};

type AuthResponse = {
  accessToken: string;
  dataAccessExpirationTime: number;
  expiresIn: number;
  signedRequest: string;
  userId: string;
} | null;

async function upsertIGCredentials({
  projectId,
  authResponse,
}: {
  projectId: string;
  authResponse: AuthResponse;
}) {
  if (!authResponse?.accessToken) {
    return;
  }

  return await prisma.instagramCredentials.upsert({
    where: {
      projectId,
    },
    create: {
      accessToken: authResponse.accessToken,
      dataAccessExpirationTime: authResponse.dataAccessExpirationTime,
      expiresIn: authResponse.expiresIn,
      signedRequest: authResponse.signedRequest,
      userId: authResponse.userId,
      project: {
        connect: {
          id: projectId,
        },
      },
    },
    update: {
      accessToken: authResponse.accessToken,
      dataAccessExpirationTime: authResponse.dataAccessExpirationTime,
      expiresIn: authResponse.expiresIn,
      signedRequest: authResponse.signedRequest,
      userId: authResponse.userId,
    },
  });
}

export default function Page() {
  const { projectId } = useLoaderData<LoaderData>();

  const [authResponse, setAuthResponse] = useState<AuthResponse>(null);

  useLayoutEffect(() => {
    FB.init({
      appId: "6261998800593353",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v16.0",
    });

    FB.getLoginStatus(function (response) {
      console.log(response, "get login status response");
    });
  }, []);

  useEffect(() => {
    if (authResponse?.accessToken) {
      upsertIGCredentials({ projectId, authResponse });
    }
  }, [authResponse, projectId]);

  return (
    <main>
      <h1>Authorize Instagram</h1>
      <button
        onClick={() => {
          FB.login(
            function (response) {
              console.log(response, "fb login response");
              if (
                response.status === "connected" &&
                response.authResponse.accessToken
              ) {
                setAuthResponse({
                  accessToken: response.authResponse.accessToken,
                  dataAccessExpirationTime:
                    response.authResponse.data_access_expiration_time,
                  expiresIn: response.authResponse.expiresIn,
                  userId: response.authResponse.userID,
                  signedRequest: response.authResponse.userID,
                });
              }
            },
            // { scope: "instagram_content_publish" }
            { scope: "public_profile" }
          );
        }}
      >
        LOGIN
      </button>
    </main>
  );
}
