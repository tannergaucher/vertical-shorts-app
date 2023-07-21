import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
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

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

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
  console.log("ACTION SUBMIT");

  const formData = await request.formData();

  const tags = formData.getAll("tags");

  console.log(tags, "tags");

  return null;
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
        <h1>Description</h1>
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

  if (!tagsFetcher.data && tagsFetcher.state !== "loading") {
    return (
      <div>
        <h2>Tags</h2>
        <button
          onClick={() => {
            tagsFetcher.load(Routes.ResourceVideoLabels(project.id, slug));
          }}
        >
          Automatically Generate Tags
        </button>
      </div>
    );
  }

  if (tagsFetcher.state === "loading") {
    return <div>Loading Tags...</div>;
  }

  if (!tagsFetcher.data?.labels) {
    return <div>No Labels</div>;
  }

  const generatedContentTags = tagsFetcher.data.labels.flatMap((label) =>
    label.entity?.description ? label.entity.description : []
  );

  const tags = [...project.tags, ...generatedContentTags];

  return (
    <>
      <h2>Tags</h2>
      <fieldset>
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
          <button type="submit">Submit</button>
        </tagsFetcher.Form>
      </fieldset>
    </>
  );
}
