import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

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

  console.log(project, "project");

  return (
    <main>
      {contents?.length ? (
        <section className={styles.contentGrid}>
          {contents.map((content) => (
            <Link
              key={content.slug}
              to={Routes.AdminContentStatus(content.slug)}
              className={styles.content}
            >
              {content.gif ? (
                <img src={content.gif} alt={content.title} />
              ) : null}
              <div>
                <h3>{content.title}</h3>
                <ul>
                  {project.channels.map((channel) => {
                    switch (channel.channelType) {
                      case "YOUTUBE":
                        return (
                          <li key={channel.channelType}>
                            {channel.channelType}: {content.youtubeStatus}
                          </li>
                        );
                      case "TIKTOK":
                        return (
                          <li key={channel.channelType}>
                            {channel.channelType}: {content.tikTokStatus}
                          </li>
                        );
                      case "TWITTER":
                        return (
                          <li key={channel.channelType}>
                            {channel.channelType}: {content.twitterStatus}
                          </li>
                        );
                      case "INSTAGRAM":
                        return (
                          <li key={channel.channelType}>
                            {channel.channelType}: {content.instagramStatus}
                          </li>
                        );
                      case "FACEBOOK":
                        return (
                          <li key={channel.channelType}>
                            {channel.channelType}: {content.facebookStatus}
                          </li>
                        );
                      default:
                        return null;
                    }
                  })}
                </ul>
              </div>
            </Link>
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
