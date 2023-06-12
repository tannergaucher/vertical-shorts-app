import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";

import { Breadcrumb } from "~/components/breadcrumb";
import { storage } from "~/entry.server";
import { getContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContent.module.css";

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
      contentType: "image/jpeg",
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

  const { slug } = useParams();

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
    <main className={styles.main}>
      <fieldset disabled={disabled}>
        <Breadcrumb slug={slug} />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleGcpSignedUpload();
          }}
        >
          <input
            type="file"
            name="thumbnail"
            className={styles.input}
            required
          />
          <button type="submit">Next</button>
        </form>
      </fieldset>
    </main>
  );
}
