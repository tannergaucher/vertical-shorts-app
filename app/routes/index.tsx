import type { LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getContents } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  return json<LoaderData>({
    contents: await getContents({
      projectId: user.currentProjectId,
    }),
  });
};

export default function Page() {
  const { contents } = useLoaderData<LoaderData>();

  return (
    <main className="padding">
      {contents?.length ? (
        <section className="content-grid">
          {contents.map((content) => (
            <div key={content.slug} className="card">
              <Link
                to={Routes.AdminContentPreview(content.slug)}
                className="card-heading"
              >{`${
                content.published
                  ? `${content.title}`
                  : `Draft - ${content.title}`
              }`}</Link>
            </div>
          ))}
        </section>
      ) : (
        <>
          <h2>No content yet for this project</h2>
          <Link to={Routes.AdminContentTitle}>
            <h3>Create Post</h3>
          </Link>
        </>
      )}
    </main>
  );
}
