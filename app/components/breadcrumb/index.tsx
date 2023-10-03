import { useLocation } from "@remix-run/react";
import { Link } from "@remix-run/react";

import { Routes } from "~/routes";

import styles from "./index.module.css";

export function Breadcrumb({ slug }: { slug?: string }) {
  const location = useLocation();

  return (
    <menu className={styles.breadcrumbMenu}>
      <ul className={styles.breadcrumbList}>
        <li>
          <Link
            to={Routes.AdminContentTitle}
            className={styles.breadcrumbLink}
            data-current={
              location.pathname.includes(Routes.AdminContentTitle)
                ? "true"
                : "false"
            }
          >
            Title
          </Link>
        </li>
        <li>
          <Link
            to={
              slug ? Routes.AdminContentVideo(slug) : Routes.AdminContentTitle
            }
            className={styles.breadcrumbLink}
            data-current={
              slug && location.pathname.includes(Routes.AdminContentVideo(slug))
                ? "true"
                : "false"
            }
          >
            Video
          </Link>
        </li>
        <li>
          <Link
            to={
              slug
                ? Routes.AdminContentTagsDescription(slug)
                : Routes.AdminContentTitle
            }
            className={styles.breadcrumbLink}
            data-current={
              slug &&
              location.pathname.includes(
                Routes.AdminContentTagsDescription(slug)
              )
                ? "true"
                : "false"
            }
          >
            Tags & Description
          </Link>
        </li>
        <li>
          <Link
            to={
              slug
                ? Routes.AdminContentScheduler(slug)
                : Routes.AdminContentTitle
            }
            className={styles.breadcrumbLink}
            data-current={
              slug &&
              location.pathname.includes(Routes.AdminContentScheduler(slug))
                ? "true"
                : "false"
            }
          >
            Schedule
          </Link>
        </li>
      </ul>
    </menu>
  );
}
