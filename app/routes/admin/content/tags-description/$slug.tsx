import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";

import { Breadcrumb } from "~/components/breadcrumb";
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
  project: Pick<Project, "id" | "tags" | "title">;
  content: Pick<Content, "tags" | "description" | "title">;
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
        title: true,
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
        title: true,
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

  return {
    success: true,
    tags: content.tags,
  };
};

export default function Page() {
  const { project, content } = useLoaderData<LoaderData>();

  const [hasGeneratedTags, setHasGeneratedTags] = useState(false);

  useEffect(() => {
    if (content.tags.length) {
      setHasGeneratedTags(true);
    }
  }, [hasGeneratedTags, content.tags]);

  const { slug } = useParams();

  invariant(slug, "slug is required");

  return (
    <main>
      <h1 className={styles.pageTitle}>{content.title}</h1>
      <h2 className={styles.pageTitle}>
        <em>{project.title}</em>
      </h2>
      <Breadcrumb slug={slug} />
      <div className={styles.tagsDescriptionGrid}>
        <section>
          <TagsForm
            project={project}
            content={content}
            slug={slug}
            hasGeneratedTags={hasGeneratedTags}
            setHasGeneratedTags={setHasGeneratedTags}
          />
        </section>
        <section>
          <DescriptionForm project={project} slug={slug} content={content} />
        </section>
      </div>
    </main>
  );
}

function TagsForm({
  project,
  content,
  slug,
  hasGeneratedTags,
  setHasGeneratedTags,
}: {
  project: LoaderData["project"];
  content: LoaderData["content"];
  slug: string;
  hasGeneratedTags: boolean;
  setHasGeneratedTags: (value: boolean) => void;
}) {
  const tagsFetcher = useFetcher();

  const tags = tagsFetcher.data?.tags
    ? [...project.tags, ...content.tags, ...tagsFetcher.data.tags]
    : [...project.tags, ...content.tags];

  return (
    <>
      <h2 className={styles.sectionTitle}>Tags</h2>
      {!hasGeneratedTags ? (
        <button
          className={styles.generateTagsButton}
          disabled={
            tagsFetcher.state === "loading" ||
            tagsFetcher.state === "submitting"
          }
          onClick={() => {
            tagsFetcher.load(Routes.ResourceVideoTags(project.id, slug));
            setHasGeneratedTags(true);
          }}
        >
          Generate Tags
        </button>
      ) : null}
      <fieldset
        disabled={
          tagsFetcher.state === "loading" || tagsFetcher.state === "submitting"
        }
      >
        <tagsFetcher.Form method="post">
          {tags.map((tag) => (
            <div key={tag}>
              <label className={styles.tagLabel}>
                {tag}
                <input type="checkbox" name="tags" value={tag} defaultChecked />
              </label>
            </div>
          ))}
          <input
            type="text"
            placeholder="Tags"
            name="tags"
            className={styles.addTagInput}
          />
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="slug" value={slug} id="slug" />
          <button type="submit" className={styles.tagsSubmitButton}>
            Submit
          </button>
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

  useEffect(() => {
    if (descriptionFetcher.state === "idle") {
      setIsEditing(false);
    }
  }, [descriptionFetcher.state]);

  return (
    <div>
      <h2 className={styles.sectionTitle}>Description</h2>
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
