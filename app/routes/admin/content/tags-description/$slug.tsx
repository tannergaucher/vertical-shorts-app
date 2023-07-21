import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import type { DetectLabelsResponse } from "service-cloud-video-intelligence";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import type { Project } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

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

  return null;
};

enum TagType {
  ProjectTag = "PROJECT_TAG",
  ContentTag = "CONTENT_TAG",
}

export default function Page() {
  const { project } = useLoaderData<LoaderData>();

  const { slug } = useParams();

  invariant(slug, "slug is required");

  return (
    <main>
      <TagsForm project={project} slug={slug} />
    </main>
  );
}

interface Tag {
  label: string;
  type: TagType;
  userSelected: boolean;
}

function TagsForm({
  project,
  slug,
}: {
  project: LoaderData["project"];
  slug: string;
}) {
  const tagsFetcher = useFetcher<DetectLabelsResponse>();

  useEffect(() => {
    if (tagsFetcher.state === "idle" && !tagsFetcher.data) {
      tagsFetcher.load(Routes.ResourceVideoLabels(project.id, slug));
    }
  }, [tagsFetcher, project.id, slug]);

  if (!tagsFetcher.data) {
    return <div>Loading..</div>;
  }

  if (!tagsFetcher.data.labels) {
    return <div>No Labels</div>;
  }

  const contentTags: Tag[] = tagsFetcher.data.labels.flatMap((label) =>
    label.entity?.description
      ? {
          label: label.entity.description,
          type: TagType.ContentTag,
          userSelected: true,
        }
      : []
  );

  const projectTags: Tag[] = project.tags.map((tag) => ({
    label: tag,
    type: TagType.ProjectTag,
    userSelected: true,
  }));

  const tags = [...projectTags, ...contentTags];

  return (
    <div>
      <h1>Tags</h1>
      <fieldset>
        <tagsFetcher.Form method="post">
          {!tagsFetcher.data ? <button>Generate Tags</button> : null}
          {tags.map((tag) => (
            <div key={tag.label} data-tag-type={tag.type}>
              <label>
                <input
                  type="checkbox"
                  name="tags"
                  value={tag.label}
                  defaultChecked
                  checked={tag.userSelected}
                  onChange={() => {
                    tagsFetcher.submit(
                      {
                        tag: tag.label,
                      },
                      {
                        method: "post",
                      }
                    );
                  }}
                />
                {tag.label}
              </label>
            </div>
          ))}
        </tagsFetcher.Form>
      </fieldset>
    </div>
  );
}
