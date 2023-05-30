import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  unstable_composeUploadHandlers,
} from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";

import invariant from "tiny-invariant";

import { getUser } from "~/session.server";
import { getContent, upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { storage } from "~/entry.server";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
};

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Thumbnail",
  };
};

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

  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, data, filename }) => {
      if (name !== "thumbnail") {
        return undefined;
      }

      invariant(user, "user is required");
      invariant(user.currentProjectId, "user must have a current project");

      const [bucket] = await storage.bucket(user.currentProjectId).exists();

      if (!bucket) {
        await storage.createBucket(user.currentProjectId);
      }

      const writeStream = storage
        .bucket(user.currentProjectId)
        .file(filename ?? "thumbnail.jpg")
        .createWriteStream();

      writeStream.on("error", (err) => {
        console.log(err, "err");
      });

      for await (const chunk of data) {
        console.log(chunk, "chunk");
        writeStream.write(chunk);
      }

      // and make public

      writeStream.end();

      return new Promise((resolve, reject) => {
        writeStream.on("finish", () => {
          resolve(filename);
        });

        writeStream.on("error", (err) => {
          reject(err);
        });
      });
    },
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const slug = formData.get("slug");
  const thumbnail = formData.get("thumbnail");

  invariant(typeof slug === "string", "slug is required");
  invariant(typeof thumbnail === "string", "thumbnail is required");
  invariant(user?.currentProjectId, "user must have a current project");

  await upsertContent({
    slug: slug.toString(),
    projectId: user.currentProjectId,
    thumbnail,
  });

  return redirect(Routes.AdminContenVideo(slug));
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  const transition = useTransition();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main>
      <h1>Draft Post: {content.title}</h1>
      <h2>Upload Thubmnail</h2>
      <fieldset disabled={disabled}>
        <Form method="post" encType="multipart/form-data">
          <input type="file" name="thumbnail" required />
          <input type="hidden" name="slug" value={content.slug} />
          <button type="submit">Next</button>
        </Form>
      </fieldset>
    </main>
  );
}
