import { Link } from "@remix-run/react";

import type { Content } from "~/models/content.server";
import type { Project } from "~/models/project.server";
import { Routes } from "~/routes";

import styles from "./index.module.css";

export function ContentStatus({
  project,
  content,
  open,
}: {
  project: Project;
  content: Content;
  open?: boolean;
}) {
  return (
    <details className={styles.details} open={open}>
      <summary className={styles.summary}>Status</summary>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Status</th>
            <th>Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {project.channels.map((channel) => {
            switch (channel.channelType) {
              case "YOUTUBE":
                return (
                  <tr key={channel.channelType}>
                    <td>
                      <a
                        href={`https://studio.youtube.com/video/${content.youtubeId}/edit`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {channel.channelType}
                      </a>
                    </td>
                    <td>{content.youtubeStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.publishAt ?? "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "TIKTOK":
                const tikTokItem = (
                  <tr key={channel.channelType}>
                    <td>
                      {channel.channelType}: {content.tikTokStatus}
                    </td>
                  </tr>
                );
                return content.tikTokId && project.tikTokCredentials?.handle ? (
                  <a
                    href={`https://www.tiktok.com/${project.tikTokCredentials.handle}/video/${content.tikTokId}}`}
                  >
                    {tikTokItem}
                  </a>
                ) : (
                  tikTokItem
                );
              case "TWITTER":
                return (
                  <tr key={channel.channelType}>
                    <td>
                      {channel.channelType}: {content.twitterStatus}
                    </td>
                  </tr>
                );
              case "INSTAGRAM":
                return (
                  <tr key={channel.channelType}>
                    <td>
                      {channel.channelType}: {content.instagramStatus}
                    </td>
                  </tr>
                );
              case "FACEBOOK":
                return (
                  <tr key={channel.channelType}>
                    <td>
                      {channel.channelType}: {content.facebookStatus}
                    </td>
                  </tr>
                );
              default:
                return null;
            }
          })}
        </tbody>
      </table>
    </details>
  );
}
