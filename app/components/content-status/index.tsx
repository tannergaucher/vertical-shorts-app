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
                        {content.youtubePublishAt
                          ? content.youtubePublishAt.toString()
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "TIKTOK":
                return (
                  <tr key={channel.channelType}>
                    <td>
                      <a
                        href={`https://www.tiktok.com/${project.tikTokCredentials?.handle}/video/${content.tikTokId}}`}
                      >
                        {channel.channelType}
                      </a>
                    </td>
                    <td>{content.tikTokStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.tikTokPublishAt
                          ? content.tikTokPublishAt.toString()
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "TWITTER":
                return (
                  <tr key={channel.channelType}>
                    <td>{channel.channelType}</td>
                    <td>{content.twitterStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.twitterPublishAt
                          ? content.twitterPublishAt.toString()
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "INSTAGRAM":
                return (
                  <tr key={channel.channelType}>
                    <td>{channel.channelType}</td>
                    <td>{content.instagramStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.instagramPublishAt
                          ? content.instagramPublishAt.toString()
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "FACEBOOK":
                return (
                  <tr key={channel.channelType}>
                    <td>{channel.channelType}</td>
                    <td>{content.facebookStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.facebookPublishAt
                          ? content.facebookPublishAt.toString()
                          : "NONE"}
                      </Link>
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
