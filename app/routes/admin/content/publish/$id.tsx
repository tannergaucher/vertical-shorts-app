import {
  type ActionFunction,
  json,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { InitializeUploadBody } from "service-upload/functions/initialize-upload";
import { ServiceUploadRoutes } from "service-upload/routes";
import { SERVICE_UPLOAD_BASE_URL } from "service-upload/utils/constants";
import invariant from "tiny-invariant";

import { Layout } from "~/components/layout";
import { getContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  if (!params.id) {
    return redirect(Routes.Admin);
  }

  const content = await getContent({
    id: params.id,
  });

  return json<LoaderData>({ content, user });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const contentId = formData.get("contentId");
  const projectId = formData.get("projectId");

  invariant(typeof contentId === "string", "contentId must be a string");
  invariant(typeof projectId === "string", "projectId must be a string");

  await fetch(
    `${SERVICE_UPLOAD_BASE_URL}${ServiceUploadRoutes.InitializeUpload}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentId,
        projectId,
      } as InitializeUploadBody),
    }
  );

  return redirect(Routes.AdminContent);
};

export default function Page() {
  const { content, user } = useLoaderData<LoaderData>();

  return (
    <Layout h1="Confirm Publish" user={user}>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
      <Form method="post">
        <input type="text" name="contentId" value={content.id} hidden />
        <input type="text" name="projectId" value={content.projectId} hidden />
        <button type="submit">Confirm Publish</button>
      </Form>
    </Layout>
  );
}
