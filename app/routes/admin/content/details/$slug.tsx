import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";

import { Breadcrumb } from "~/components/breadcrumb";
import { prisma } from "~/db.server";
import type { Content } from "~/models/content.server";
import type { Project } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Post Details",
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

  const projectId = formData.get("projectId");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const tags = formData.get("tags");

  invariant(typeof projectId === "string", "projectId is required");
  invariant(typeof slug === "string", "slug is required");

  console.log(description, "description");
  console.log(tags, "tags");

  return {
    success: true,
  };
};

export default function Page() {
  const { project, content } = useLoaderData<LoaderData>();

  const { slug } = useParams();

  invariant(slug, "slug is required");

  return (
    <main>
      <h1>Details</h1>
      <Breadcrumb slug={slug} />
      <section>
        <DescriptionForm project={project} slug={slug} content={content} />
        <TagsForm project={project} slug={slug} content={content} />
      </section>
    </main>
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
          ></textarea>
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="slug" value={slug} id="slug" />
          <button type="submit">Save</button>
        </descriptionFetcher.Form>
      </fieldset>
    </div>
  );
}

function TagsForm({
  project,
  slug,
  content,
}: {
  project: LoaderData["project"];
  content: LoaderData["content"];
  slug: string;
}) {
  const tagsFetcher = useFetcher();

  return (
    <div>
      <h2>Tags</h2>
      <fieldset
        disabled={
          tagsFetcher.state === "loading" || tagsFetcher.state === "submitting"
        }
      >
        <tagsFetcher.Form method="post">
          <input
            type="text"
            name="tags"
            id="tags"
            defaultValue={content.tags.join(", ")}
          />
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="slug" value={slug} id="slug" />
          <button type="submit">Save</button>
        </tagsFetcher.Form>
      </fieldset>
    </div>
  );
}
