import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_createFileUploadHandler,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { storage } from "~/entry.server";

import { getUser } from "~/session.server";
import { getContent, upsertContent } from "~/models/content.server";
import { uploadGcsFile } from "~/routes/admin/content/thumbnail/$slug";
import { Routes } from "~/routes";
import { pubsub } from "~/entry.server";

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

  const videoFile = `${slug}.mp4`;

  await uploadGcsFile({
    storage,
    bucket: user.currentProjectId,
    filePath: video.filepath,
    destFileName: videoFile,
  });

  await upsertContent({
    slug: slug.toString(),
    projectId: user.currentProjectId,
    video: videoFile,
  });

  pubsub.topic("process-content-video").publishMessage({
    json: { slug, projectId: user.currentProjectId },
  });

  return redirect(Routes.AdminContentPreview(slug));
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>{content.title}</h1>
      {content.thumbnail ? (
        <img src={content.thumbnail} alt={content.title} />
      ) : null}
      <h2>Upload Video</h2>
      <Form method="post" encType="multipart/form-data">
        <label>
          <span>Video</span>
          <br />
          <input type="file" name="video" />
        </label>
        <input type="hidden" name="slug" value={content.slug} />
        <button type="submit">Next</button>
      </Form>
    </main>
  );
}
