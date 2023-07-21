import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useState } from "react";
import type { DetectLabelsResponse } from "service-cloud-video-intelligence";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import type { Content } from "~/models/content.server";
import type { Project } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContentTagsDescription.module.css";

export const meta: MetaFunction = () => {
  return {
    title: "Tags & Description",
  };
};

type LoaderData = {
  project: Pick<Project, "id" | "tags">;
  content: Pick<Content, "tags" | "description">;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await getUser(request);

  const slug = params.slug;

  invariant(typeof slug === "string", "slug is required");

  if (!user) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  return json<LoaderData>({
    project: await prisma.project.findUniqueOrThrow({
      where: {
        id: user.currentProjectId,
      },
      select: {
        id: true,
        tags: true,
      },
    }),
    content: await prisma.content.findUniqueOrThrow({
      where: {
        projectId_slug: {
          projectId: user.currentProjectId,
          slug,
        },
      },
      select: {
        tags: true,
        description: true,
      },
    }),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const tags = formData.getAll("tags");
  const projectId = formData.get("projectId");
  const slug = formData.get("slug");
  const description = formData.get("description");

  console.log(description, "_description");

  invariant(typeof projectId === "string", "projectId is required");
  invariant(typeof slug === "string", "slug is required");

  const content = await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    data: {
      tags: tags.length
        ? {
            set: tags.flatMap((tag) =>
              tag.toString().length ? tag.toString().trim() : []
            ),
          }
        : undefined,

      description: description ? description.toString().trim() : undefined,
    },
    select: {
      tags: true,
    },
  });

  return json({
    labels: content.tags,
  });
};

export default function Page() {
  const { project, content } = useLoaderData<LoaderData>();

  const { slug } = useParams();

  invariant(slug, "slug is required");

  return (
    <main className={styles.main}>
      <section>
        <TagsForm project={project} slug={slug} />
      </section>
      <section>
        <DescriptionForm project={project} slug={slug} content={content} />
      </section>
    </main>
  );
}

function TagsForm({
  project,
  slug,
}: {
  project: LoaderData["project"];
  slug: string;
}) {
  const tagsFetcher = useFetcher<DetectLabelsResponse>();

  if (!tagsFetcher.data) {
    return (
      <div>
        <h2>Tags</h2>
        <button
          disabled={
            tagsFetcher.state === "loading" ||
            tagsFetcher.state === "submitting"
          }
          onClick={() => {
            tagsFetcher.load(Routes.ResourceVideoLabels(project.id, slug));
          }}
        >
          Automatically Generate Tags
        </button>
      </div>
    );
  }

  if (!tagsFetcher.data?.labels) {
    return <div>No Generated Tags</div>;
  }

  const tags = [
    // ...project.tags,
    ...tagsFetcher.data.labels,
  ];

  return (
    <>
      <h2>Tags</h2>
      <fieldset
        disabled={
          tagsFetcher.state === "loading" || tagsFetcher.state === "submitting"
        }
      >
        <tagsFetcher.Form method="post">
          {!tagsFetcher.data ? <button>Generate Tags</button> : null}
          {tags.map((tag) => (
            <div key={tag}>
              <label className={styles.tagLabel}>
                {tag}
                <input type="checkbox" name="tags" value={tag} defaultChecked />
              </label>
            </div>
          ))}
          <input type="text" placeholder="Tags" name="tags" />
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="slug" value={slug} id="slug" />
          <button type="submit">Submit</button>
        </tagsFetcher.Form>
      </fieldset>
    </>
  );
}

function DescriptionForm({
  project,
  slug,
  content,
}: {
  project: LoaderData["project"];
  content: LoaderData["content"];
  slug: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const descriptionFetcher = useFetcher();

  return (
    <div>
      <h2>Description</h2>
      <fieldset
        disabled={
          descriptionFetcher.state === "loading" ||
          descriptionFetcher.state === "submitting"
        }
      >
        <descriptionFetcher.Form method="post">
          <textarea
            name="description"
            id="description"
            defaultValue={content.description || ""}
            onFocus={() => {
              setIsEditing(true);
            }}
          ></textarea>
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="slug" value={slug} id="slug" />
          {isEditing ? <button type="submit">Save</button> : null}
        </descriptionFetcher.Form>
      </fieldset>
    </div>
  );
}
