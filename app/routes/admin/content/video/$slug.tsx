import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import { storage } from "~/entry.server";

import { getUser } from "~/session.server";
import { getContent, upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";


type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
};

interface Video {
  filepath: string;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug;

  invariant(slug, "slug is required");

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  const projectId = user?.currentProjectId;

  invariant(typeof projectId === "string", "user must have a current project");

  const content = await getContent({
    slug,
    projectId,
  });

  return json({ content });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);

  console.log("_action")

  invariant(user?.currentProjectId, "user must have a current project");

  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 500_000_000,
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const slug = formData.get("slug");
  const video = formData.get("video") as Video | null;

  invariant(typeof slug === "string", "slug is required");
  invariant(video, "video is required");

  const [bucket] = await storage.bucket(user.currentProjectId).exists();

  if (!bucket) {
    await storage.createBucket(user.currentProjectId);
  }

  await storage.bucket(user.currentProjectId).upload(video.filepath, {
    destination: `${slug}.mp4`,
    public: true,
    onUploadProgress: (progress) => {
      console.log(progress, "progress");
    },
  });

  await upsertContent({
    slug: slug.toString(),
    projectId: user.currentProjectId,
  });
  
  // pubsub.topic("create-vertical-video-content").publishMessage({
  //   json: { slug, projectId: user.currentProjectId },
  // });

  return redirect(Routes.AdminContentPreview(slug));
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  const transition = useTransition();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main>
      <h1>Draft Post: {content.title}</h1>
      <img
        alt={content.title}
        src={`https://storage.googleapis.com/${content.projectId}/${content.slug}.jpg`}
      />
      <h2>Upload Video</h2>
      <fieldset disabled={disabled}>
        <Form method="post" encType="multipart/form-data">
          <label>
            <span>Video</span>
            <br />
            <input
              type="file"
              name="video"
              required
              style={{ width: `100%` }}
            />
          </label>
          <input type="hidden" name="slug" value={content.slug} />
          <button
            type="submit"
            style={{ width: `100%`, position: `sticky`, bottom: 0 }}
          >
            Next
          </button>
        </Form>
      </fieldset>
    </main>
  );
}
