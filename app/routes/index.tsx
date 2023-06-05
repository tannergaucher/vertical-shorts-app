import type { LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getContents } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import { prisma } from "~/db.server";

import styles from "~/styles/admin.module.css";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
  projectTitle: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const project = await prisma.project.findUnique({
    where: {
      id: user.currentProjectId,
    },
    select: {
      title: true,
    },
  });

  if (!project?.title) {
    return redirect(Routes.AdminCreateProject);
  }

  return json<LoaderData>({
    contents: await getContents({
      projectId: user.currentProjectId,
    }),
    projectTitle: project.title,
  });
};

export default function Page() {
  const { contents, projectTitle } = useLoaderData<LoaderData>();

  return (
    <main className={styles.main}>
      {contents?.length ? (
        <section className={styles.contentGrid}>
          {contents.map((content) => (
            <div key={content.slug} className={styles.content}>
              <Link to={Routes.AdminContentStatus(content.slug)}>{`${
                content.published
                  ? `${content.title}`
                  : `Draft - ${content.title}`
              }`}</Link>
            </div>
          ))}
        </section>
      ) : (
        <>
          <h2>{`No content yet for project: ${projectTitle}`}</h2>
          <Link to={Routes.AdminContentTitle}>
            <h3>Create Post</h3>
          </Link>
        </>
      )}
    </main>
  );
}
