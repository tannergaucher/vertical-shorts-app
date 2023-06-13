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
    title: "Create Post - Video",
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

  const [signedUrl] = await storage
    .bucket(projectId)
    .file(`${slug}.mp4`)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes in milliseconds
      contentType: "video/mp4",
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
        const videoData = e.target?.result;

        try {
          const res = await fetch(signedUrl, {
            method: "PUT",
            body: videoData,
            headers: {
              "Content-Type": "video/mp4",
            },
          });

          if (res.ok) {
            navigate(Routes.AdminContentScheduler(content.slug));
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
            required
            className={styles.input}
          />
          <button type="submit">Next</button>
        </form>
      </fieldset>
    </main>
  );
}
