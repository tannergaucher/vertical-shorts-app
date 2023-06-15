import type { Content } from "~/models/content.server";
import type { ProjectWithChannels } from "~/models/project.server";

import styles from "./index.module.css";

export function ContentStatus({
  project,
  content,
  open,
}: {
  project: ProjectWithChannels;
  content: Content;
  open?: boolean;
}) {
  return (
    <details className={styles.details} open={open}>
      <summary className={styles.summary}>Status</summary>
      <ul>
        {project.channels.map((channel) => {
          switch (channel.channelType) {
            case "YOUTUBE":
              const youtubeItem = (
                <li key={channel.channelType}>
                  {channel.channelType}: {content.youtubeStatus}
                </li>
              );
              return content.youtubeId ? (
                <a
                  href={`https://studio.youtube.com/video/${content.youtubeId}/edit`}
                >
                  {youtubeItem}
                </a>
              ) : (
                youtubeItem
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
    </details>
  );
}
