import { useState } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";

import invariant from "tiny-invariant";

import { getUser } from "~/session.server";
import { getContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { storage } from "~/entry.server";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  signedUrl: string;
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

  const projectId = user.currentProjectId;

  invariant(typeof projectId === "string", "user must have a current project");

  const [bucket] = await storage.bucket(projectId).exists();

  if (!bucket) {
    await storage.createBucket(projectId);
  }

  storage.bucket(projectId).setCorsConfiguration([
    {
      origin: ["*"],
      method: ["PUT"],
      responseHeader: ["Content-Type"],
    },
  ]);

  const [signedUrl] = await storage
    .bucket(projectId)
    .file(`${slug}.jpg`)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes in milliseconds
      contentType: "application/octet-stream",
    });

  const content = await getContent({
    slug,
    projectId,
  });

  return json({ content, signedUrl });
};

export default function Page() {
  const [disabled, setDisabled] = useState(false);
  const { content, signedUrl } = useLoaderData<LoaderData>();

  const navigate = useNavigate();

  async function handleGcpSignedUpload() {
    setDisabled(true);
    const input = document.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);

      reader.onload = async (e) => {
        const imageData = e.target?.result;

        try {
          const res = await fetch(signedUrl, {
            method: "PUT",
            body: imageData,
            headers: {
              "Content-Type": "application/octet-stream",
            },
          });

          if (res.ok) {
            navigate(Routes.AdminContentVideo(content.slug));
          }
        } catch (error) {
          console.log(error, "error");
        } finally {
          setDisabled(false);
        }
      };
    }
  }

  return (
    <main>
      <h1>Post: {content.title}</h1>
      <h2>Upload Thubmnail</h2>
      <fieldset disabled={disabled}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleGcpSignedUpload();
          }}
        >
          <input type="file" name="thumbnail" required />
          <button type="submit">Next</button>
        </form>
      </fieldset>
    </main>
  );
}
