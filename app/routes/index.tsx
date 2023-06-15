import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { ContentStatus } from "~/components/content-status";
import { getContents } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/index.module.css";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
  project: Awaited<ReturnType<typeof getProject>>;
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
    project: await getProject({
      id: user.currentProjectId,
    }),
  });
};

export default function Page() {
  const { contents, project } = useLoaderData<LoaderData>();

  return (
    <main className={styles.main}>
      {contents?.length ? (
        <section className={styles.contentGrid}>
          {contents.map((content) => (
            <div key={content.slug} className={styles.contentCard}>
              {content.gif ? (
                <img src={content.gif} alt={content.title} />
              ) : null}
              <div className={styles.contentCardDetails}>
                <Link to={Routes.AdminContentStatus(content.slug)}>
                  <h3 className={styles.contentTitle}>{content.title}</h3>
                </Link>
                <ContentStatus project={project} content={content} />
              </div>
            </div>
          ))}
        </section>
      ) : (
        <>
          <h2>{`No content yet for project: ${project.title}`}</h2>
          <Link to={Routes.AdminContentTitle}>
            <h3>Create Post</h3>
          </Link>
        </>
      )}
    </main>
  );
}
