import { useLocation } from "@remix-run/react";
import { Link } from "@remix-run/react";

import { Routes } from "~/routes";

export function Breadcrumb({ slug }: { slug?: string }) {
  const location = useLocation();

  return (
    <section>
      <ul
        style={{
          margin: `0`,
          padding: `0`,
          display: `flex`,
          listStyle: `none`,
        }}
      >
        <li>
          <Link
            to={Routes.AdminContentTitle}
            data-current={
              location.pathname.includes(Routes.AdminContentTitle)
                ? true
                : undefined
            }
          >
            <h3
              style={{
                marginLeft: `0`,
              }}
            >
              Title
            </h3>
          </Link>
        </li>

        <li>
          <Link
            to={
              slug ? Routes.AdminContentVideo(slug) : Routes.AdminContentTitle
            }
            data-current={
              slug && location.pathname.includes(Routes.AdminContentVideo(slug))
                ? true
                : undefined
            }
          >
            <h3>Video</h3>
          </Link>
        </li>
        <li>
          <Link
            to={
              slug ? Routes.AdminContentDetails(slug) : Routes.AdminContentTitle
            }
            data-current={
              slug &&
              location.pathname.includes(Routes.AdminContentDetails(slug))
                ? true
                : undefined
            }
          >
            <h3>Details</h3>
          </Link>
        </li>
        <li>
          <Link
            to={
              slug
                ? Routes.AdminContentScheduler(slug)
                : Routes.AdminContentTitle
            }
            data-current={
              slug &&
              location.pathname.includes(Routes.AdminContentScheduler(slug))
                ? true
                : undefined
            }
          >
            <h3>Schedule</h3>
          </Link>
        </li>
      </ul>
    </section>
  );
}
