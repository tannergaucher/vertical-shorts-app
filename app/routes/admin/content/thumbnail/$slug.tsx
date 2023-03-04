import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_createFileUploadHandler,
} from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import type { Storage } from "@google-cloud/storage";

import invariant from "tiny-invariant";

import { getUser } from "~/session.server";
import { getContent, upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { pubsub, storage } from "~/entry.server";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
};

interface Thubmnail {
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
  const thumbnail = formData.get("thumbnail") as Thubmnail | null;

  invariant(typeof slug === "string", "slug is required");
  invariant(thumbnail, "thumbnail is required");

  const [bucket] = await storage.bucket(user.currentProjectId).exists();

  if (!bucket) {
    await storage.createBucket(user.currentProjectId);
  }

  await uploadGcsFile({
    storage,
    bucket: user.currentProjectId,
    filePath: thumbnail.filepath,
    destFileName: `${slug}_thumbnail.jpg`,
  });

  await upsertContent({
    slug: slug.toString(),
    projectId: user.currentProjectId,
    thumbnail: `${slug}_thumbnail.jpg`,
  });

  // publish message

  await pubsub
    .topic("update-content-thumbnail")
    .publishJSON({ slug, projectId: user.currentProjectId });

  return redirect(Routes.AdminContenVideo(slug));
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  const transition = useTransition();

  return (
    <main>
      <h1>{content.title}</h1>
      <h2>Upload Thubmnail</h2>
      <fieldset disabled={transition.state === "loading"}>
        <Form method="post" encType="multipart/form-data">
          <label>
            <input type="file" name="thumbnail" required />
          </label>
          <input type="hidden" name="slug" value={content.slug} />
          <button type="submit">Next</button>
        </Form>
      </fieldset>
    </main>
  );
}

export async function uploadGcsFile(params: {
  storage: Storage;
  bucket: string;
  filePath: string;
  destFileName: string;
}) {
  try {
    const { bucket, filePath, destFileName, storage } = params;

    const options = {
      destination: destFileName,
      public: true,
    };

    await storage.bucket(bucket).upload(filePath, options);

    console.log(`${destFileName} uploaded to ${bucket}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading thumbnail to GCS");
  }
}
