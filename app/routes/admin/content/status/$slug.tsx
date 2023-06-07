import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form,useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteContent,getContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Preview",
  };
};

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug;

  invariant(slug, "slug is required");

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  invariant(user?.currentProjectId, "user must have a current project");

  return json({
    user,
    content: await getContent({
      slug,
      projectId: user.currentProjectId,
    }),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const slug = formData.get("slug");
  const projectId = formData.get("projectId");

  invariant(typeof slug === "string", "slug is required");
  invariant(typeof projectId === "string", "projectId is required");

  await deleteContent({
    slug,
    projectId,
  });

  return redirect(Routes.Index);
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  const transition = useTransition();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main>
      <h1>{content.title}</h1>
      <video
        src={`https://storage.googleapis.com/${content.projectId}/${content.slug}.mp4`}
        controls
        style={{
          width: `500px`,
        }}
      ></video>
      <img
        src={`https://storage.googleapis.com/${content.projectId}/${content.slug}.jpg`}
        alt="content thumbnail"
        style={{
          width: `500px`,
        }}
      />
      <fieldset disabled={disabled}>
        <Form method="post">
          <input type="hidden" name="slug" value={content.slug} />
          <input type="hidden" name="projectId" value={content.projectId} />
          <button type="submit">Delete</button>
        </Form>
      </fieldset>
    </main>
  );
}
