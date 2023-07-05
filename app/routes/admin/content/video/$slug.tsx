import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { z } from "zod";

import { Breadcrumb } from "~/components/breadcrumb";
import { storage } from "~/entry.server";
import { getContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContent.module.css";
import { UPLOAD_SERVICE_BASE_URL } from "~/utils/constants";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  signedUrl: string;
  projectId: string;
};

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Video",
  };
};

const schema = z.object({
  slug: z.string(),
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = schema.parse(params);

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  if (!user.planType) {
    return redirect(`${Routes.Signup}?from=${slug}`);
  }

  const projectId = user?.currentProjectId;

  invariant(typeof projectId === "string", "user must have a current project");

  const [bucket] = await storage.bucket(projectId).exists();

  if (!bucket) {
    await storage.createBucket(projectId).then(async () => {
      await storage
        .bucket(projectId)
        .makePublic()
        .then(async () => {
          await storage.bucket(projectId).setCorsConfiguration([
            {
              origin: ["*"],
              method: ["PUT", "GET"],
              responseHeader: ["Content-Type"],
            },
          ]);
        });
    });
  }

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

  return json({ content, signedUrl, projectId });
};

export default function Page() {
  const { content, signedUrl, projectId } = useLoaderData<LoaderData>();

  const [disabled, setDisabled] = useState(false);

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
          await fetch(signedUrl, {
            method: "PUT",
            body: videoData,
            headers: {
              "Content-Type": "video/mp4",
            },
          });

          // and publish annotate video to pubsub
        } catch (error) {
          console.log(error, "error");
          setDisabled(false);
        } finally {
          const uploadContentRes = await fetch(
            `${UPLOAD_SERVICE_BASE_URL}/upload-content`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                slug,
                projectId,
              }),
            }
          );

          setDisabled(false);

          if (uploadContentRes.ok) {
            navigate(Routes.AdminContentScheduler(content.slug));
          }
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
