import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import type { UploadContentBody } from "service-upload/functions/upload-content";
import invariant from "tiny-invariant";
import { z } from "zod";

import { Breadcrumb } from "~/components/breadcrumb";
import { storage } from "~/entry.server";
import { getContent } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContent.module.css";
import { UPLOAD_SERVICE_BASE_URL } from "~/utils/constants";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  project: Awaited<ReturnType<typeof getProject>>;
  signedUrl: string;
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

  const project = await getProject({
    id: projectId,
  });

  return json({ content, signedUrl, project });
};

async function handleGcpSignedUpload({
  slug,
  signedUrl,
  projectId,
  input,
}: {
  slug: string;
  signedUrl: string;
  projectId: string;
  input: HTMLInputElement;
}) {
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
        }).then(async () => {
          const body: UploadContentBody = {
            slug,
            projectId,
          };

          await fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-content`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        });
      } catch (error) {
        console.log(error, "error");
      }
    };
  }
}

export default function Page() {
  const { content, signedUrl, project } = useLoaderData<LoaderData>();

  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const { slug } = useParams();

  async function handleSubmit() {
    const input = document.querySelector("input[type=file]");

    invariant(input instanceof HTMLInputElement, "input must be a file input");

    try {
      setDisabled(true);

      await handleGcpSignedUpload({
        slug: content.slug,
        signedUrl,
        projectId: project.id,
        input,
      });

      navigate(Routes.AdminContentTagsDescription(content.slug));
    } catch (error) {
      console.log(error, "error");
    } finally {
      setDisabled(false);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>{content.title}</h1>
      <h2 className={styles.pageTitle}>
        <em>{project.title}</em>
      </h2>
      <Breadcrumb slug={slug} />
      <fieldset disabled={disabled}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit();
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
