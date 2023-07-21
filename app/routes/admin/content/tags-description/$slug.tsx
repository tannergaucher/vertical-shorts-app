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

  return json({
    project: await prisma.project.findUnique({
      where: {
        id: user.currentProjectId,
      },
      select: {
        id: true,
        tags: true,
      },
    }),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const tags = formData.getAll("tags");
  const projectId = formData.get("projectId");
  const slug = formData.get("slug");

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
      tags: {
        set: tags.flatMap((tag) => (tag.length ? tag.toString().trim() : [])),
      },
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
  const { project } = useLoaderData<LoaderData>();

  const { slug } = useParams();

  invariant(slug, "slug is required");

  return (
    <main className={styles.main}>
      <section>
        <TagsForm project={project} slug={slug} />
      </section>
      <section>
        <DescriptionForm />
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

function DescriptionForm() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <h2>Description</h2>
      <textarea
        name=""
        id="description"
        onFocus={() => {
          setIsEditing(true);
        }}
      ></textarea>
      {isEditing ? <button>Save</button> : null}
    </>
  );
}
