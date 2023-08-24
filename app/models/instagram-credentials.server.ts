import type { InstagramCredentials as InstagramCredentialsModel } from "@prisma/client";

import { prisma } from "~/db.server";

export type InstagramAuthResponse =
  | (Pick<
      InstagramCredentialsModel,
      | "accessToken"
      | "dataAccessExpirationTime"
      | "expiresIn"
      | "signedRequest"
      | "userId"
    > & {
      accessToken: string;
      dataAccessExpirationTime: number;
      expiresIn: number;
      signedRequest: string;
      userId: string;
    })
  | null;

export { InstagramCredentialsModel };

export async function upsertIGCredentials({
  projectId,
  userId,
  instagramAuthResponse,
}: {
  projectId: string;
  userId: string;
  instagramAuthResponse: InstagramAuthResponse;
}) {
  if (!instagramAuthResponse?.accessToken) {
    return;
  }

  try {
    const upsertInstagramPayload = {
      project: {
        connect: {
          id: projectId,
        },
      },
      userId,
      accessToken: "access-token",
      dataAccessExpirationTime: 100,
      expiresIn: 200,
      signedRequest: "signed-test",
    };

    const upsertedInstagramCredentials =
      await prisma.instagramCredentials.upsert({
        where: {
          projectId,
        },
        create: {
          ...upsertInstagramPayload,
        },
        update: {
          ...upsertInstagramPayload,
        },
      });

    console.log(upsertedInstagramCredentials, "_upsertedIgCredentials");
  } catch (error) {
    console.log("error", error);
  }
}
