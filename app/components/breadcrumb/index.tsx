import { useLocation } from "@remix-run/react";
import { Link } from "@remix-run/react";

import styles from "./index.module.css";
// import { Routes } from "~/routes";

export function Breadcrumb() {
  const location = useLocation();

  console.log(location);
  console.log(location.pathname.includes("/admin/content/thumbnail"));

  return (
    <menu className={styles.menu}>
      <ul>
        <li>
          <Link
            to="#"
            data-current={
              location.pathname.includes("/admin/content/title")
                ? "true"
                : "false"
            }
          >{`Title >`}</Link>
        </li>
        <li>
          <Link
            to="#"
            data-current={
              location.pathname.includes("/admin/content/thumbnail")
                ? "true"
                : "false"
            }
          >{`Thumbnail >`}</Link>
        </li>
        <li>
          <Link
            to="#"
            data-current={
              location.pathname.includes("/admin/content/video")
                ? "true"
                : "false"
            }
          >{`Video >`}</Link>
        </li>
        <li>
          <Link
            to="#"
            data-current={
              location.pathname.includes("/admin/content/schedule")
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
