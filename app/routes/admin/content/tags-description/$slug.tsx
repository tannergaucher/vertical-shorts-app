import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import type { DetectLabelsResponse } from "service-cloud-video-intelligence";
import invariant from "tiny-invariant";

import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Tags & Description",
  };
};

type LoaderData = {
  projectId: string;
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
    projectId: user.currentProjectId,
  });
};

export default function Page() {
  const { projectId } = useLoaderData<LoaderData>();

  const { slug } = useParams();

  invariant(slug, "slug is required");

  return (
    <main>
      <TagsForm projectId={projectId} slug={slug} />
    </main>
  );
}

function TagsForm({ projectId, slug }: { projectId: string; slug: string }) {
  const tagsFetcher = useFetcher<DetectLabelsResponse>();

  useEffect(() => {
    if (tagsFetcher.state === "idle" && !tagsFetcher.data) {
      tagsFetcher.load(Routes.ResourceVideoLabels(projectId, slug));
    }
  }, [tagsFetcher, projectId, slug]);

  if (!tagsFetcher.data) {
    return <div>Auto generating tags...</div>;
  }

  if (!tagsFetcher.data.labels) {
    return <div>No Labels</div>;
  }

  const labels = tagsFetcher.data.labels.flatMap(
    (label) => label.entity?.description ?? []
  );

  return (
    <div>
      <h1>Tags</h1>
      <fieldset>
        <tagsFetcher.Form>
          {!tagsFetcher.data ? <button>Generate Tags</button> : null}
          {labels.map((label) => (
            <div key={label}>
              <label>
                <input
                  type="checkbox"
                  name="tags"
                  value={label}
                  defaultChecked
                />
                {label}
              </label>
            </div>
          ))}
        </tagsFetcher.Form>
      </fieldset>
    </div>
  );
}
