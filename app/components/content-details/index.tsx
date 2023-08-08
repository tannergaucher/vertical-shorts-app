import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import type { Content } from "~/models/content.server";
import type { Project } from "~/models/project.server";
import { Routes } from "~/routes";
import { formatDate } from "~/utils/format-date";

import styles from "./index.module.css";

export function ContentDetails({
  project,
  content,
  open,
  selectedDetails,
  setSelectedDetails,
  scrollIntoView,
}: {
  project: Project;
  content: Content;
  open?: boolean;
  scrollIntoView?: boolean;
  selectedDetails?: string | null;
  setSelectedDetails?: (slug: string | null) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (content.slug === selectedDetails || open) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedDetails, content.slug, open]);

  useEffect(() => {
    if (scrollIntoView && isOpen) {
      const selectedDetails = document.getElementById(content.slug);

      selectedDetails?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isOpen, scrollIntoView, content.slug]);

  return (
    <details
      id={content.slug}
      className={styles.details}
      open={isOpen}
      onClick={(e) => {
        e.preventDefault();

        if (selectedDetails === content.slug) {
          setSelectedDetails?.(null);
          return;
        }

        setSelectedDetails?.(content.slug);
      }}
    >
      <summary className={styles.summary}>Details</summary>
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
                          ? formatDate(content.youtubePublishAt)
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
                          ? formatDate(content.tikTokPublishAt)
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
                          ? formatDate(content.twitterPublishAt)
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
                          ? formatDate(content.instagramPublishAt)
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
                          ? formatDate(content.facebookPublishAt)
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
