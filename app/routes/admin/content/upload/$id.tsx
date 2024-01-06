import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";

import { Layout } from "~/components/layout";
import { storage } from "~/entry.server";
import { upsertContent } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  content: Awaited<ReturnType<typeof upsertContent>>;
  project: Awaited<ReturnType<typeof getProject>>;
  signedUrl: string;
};

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Video",
  };
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await getUser(request);

  if (!params.id) {
    return redirect(Routes.Admin);
  }

  if (!user) {
    return redirect(Routes.Login);
  }

  // if (!user.planType) {
  //   return redirect(Routes.Signup);
  // }

  const projectId = user?.currentProjectId;

  invariant(typeof projectId === "string", "user must have a current project");

  const content = await upsertContent({
    id: params.id,
    projectId,
  });

  const [signedUrl] = await storage
    .bucket(projectId)
    .file(`${content.id}.mp4`)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes in milliseconds
      contentType: "video/mp4",
    });

  const project = await getProject({
    id: projectId,
  });

  return json<LoaderData>({ signedUrl, project, content });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) return redirect(Routes.Login);

  const formData = await request.formData();

  const projectId = formData.get("projectId");
  const contentId = formData.get("contentId");
  const title = formData.get("title");
  const description = formData.get("description");
  const tags = formData.get("tags");

  invariant(typeof projectId === "string", "Project ID is required");
  invariant(typeof contentId === "string", "Content ID is required");

  console.log({ projectId, contentId, title, description, tags });

  const content = await upsertContent({
    id: contentId,
    projectId,
    title: title?.toString().trim(),
    description: description?.toString().trim(),
    tags: tags
      ?.toString()
      .trim()
      .split(",")
      .map((tag) => tag.trim()),
  });

  return content;
};

export default function Page() {
  const { signedUrl, content, project } = useLoaderData<LoaderData>();

  return (
    <Layout h1="Upload Content">
      <VideoForm signedUrl={signedUrl} />
      <TitleForm
        projectId={project.id}
        contentId={content.id}
        title={content.title || ""}
      />
      <DescriptionForm
        projectId={project.id}
        contentId={content.id}
        description={content.description || ""}
      />
      <TagsForm
        projectId={project.id}
        tags={content.tags || []}
        contentId={content.id}
      />
      <button type="submit">Publish</button>
    </Layout>
  );
}

function VideoForm({ signedUrl }: { signedUrl: string }) {
  const [disabled, setDisabled] = useState(false);

  async function handleVideoUpload() {
    setDisabled(true);

    const input = document.querySelector("input[type=file]");

    invariant(input instanceof HTMLInputElement, "input must be a file input");

    const file = input?.files?.[0];

    invariant(file, "Video File is required");

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const body = e.target?.result;

      const res = await fetch(signedUrl, {
        method: "PUT",
        body,
        headers: {
          "Content-Type": "video/mp4",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to upload video");
      }

      setDisabled(false);

      // and now call the create content gif endpoint
    };
  }
  return (
    <fieldset disabled={disabled}>
      <form>
        <label htmlFor="thumbnail">Video File</label>
        <input
          type="file"
          name="thumbnail"
          required
          onChange={async (e) => {
            e.preventDefault();
            await handleVideoUpload();
          }}
        />
      </form>
    </fieldset>
  );
}

function DescriptionForm({
  projectId,
  description,
  contentId,
}: {
  projectId: string;
  description?: string;
  contentId: string;
}) {
  const descriptionFetcher = useFetcher();

  return (
    <descriptionFetcher.Form method="post">
      <fieldset
        disabled={
          descriptionFetcher.state === "loading" ||
          descriptionFetcher.state === "submitting"
        }
      >
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          defaultValue={description || ""}
          onBlur={async (e) => {
            e.preventDefault();
            descriptionFetcher.submit(e.currentTarget.form, {
              method: "post",
            });
          }}
        ></textarea>
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="contentId" value={contentId} />
      </fieldset>
    </descriptionFetcher.Form>
  );
}

function TagsForm({
  projectId,
  contentId,
  tags,
}: {
  projectId: string;
  contentId: string;
  tags: string[];
}) {
  const tagsFetcher = useFetcher();

  return (
    <tagsFetcher.Form method="post">
      <fieldset
        disabled={
          tagsFetcher.state === "loading" || tagsFetcher.state === "submitting"
        }
      >
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          id="tags"
          defaultValue={tags.join(", ")}
          onBlur={async (e) => {
            e.preventDefault();
            tagsFetcher.submit(e.currentTarget.form, {
              method: "post",
            });
          }}
        />
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="contentId" value={contentId} />
      </fieldset>
    </tagsFetcher.Form>
  );
}

function TitleForm({
  projectId,
  contentId,
  title,
}: {
  projectId: string;
  contentId: string;
  title?: string;
}) {
  const titleFetcher = useFetcher();

  return (
    <titleFetcher.Form method="post">
      <fieldset
        disabled={
          titleFetcher.state === "loading" ||
          titleFetcher.state === "submitting"
        }
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={title || ""}
          onBlur={async (e) => {
            e.preventDefault();
            titleFetcher.submit(e.currentTarget.form, {
              method: "post",
            });
          }}
        />
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="contentId" value={contentId} />
      </fieldset>
    </titleFetcher.Form>
  );
}
