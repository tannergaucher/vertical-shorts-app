import { json, type LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { Layout } from "~/components/layout";
import { getContents } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  user?: Awaited<ReturnType<typeof getUser>>;
  content?: Awaited<ReturnType<typeof getContents>>;
  project?: Awaited<ReturnType<typeof getProject>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const content = await getContents({
    projectId: user.currentProjectId,
  });

  const project = await getProject({
    id: user.currentProjectId,
  });

  return json({
    user,
    content,
    project,
  });
};

export default function Page() {
  const { content, project } = useLoaderData<LoaderData>();

  return (
    <Layout h1={project?.title || "Content"}>
      <section>
        {content?.map((content) => (
          <article key={content.id}>
            <Link to={Routes.AdminContentDetails(content.id)}>
              {content.bucketUrl ? (
                <video
                  autoPlay
                  loop
                  muted
                  src={content.bucketUrl}
                  style={{
                    width: "100%",
                  }}
                ></video>
              ) : null}
              <h2>{content.title}</h2>
              <p>{content.description}</p>
            </Link>
          </article>
        ))}
      </section>
    </Layout>
  );
}
