import { Link } from "@remix-run/react";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";

import { getUser } from "./session.server";
import { Routes } from "./routes";

import stylesheet from "./styles/index.css";
import styles from "./root.module.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: stylesheet,
      type: "text/css",
    },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Vertical Shorts Platform",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav className={styles.nav}>
          <Link to={Routes.Index}>
            <h3>Shorts Publisher</h3>
          </Link>
          <menu className={styles.menu}>
            <ul className={styles.ul}>
              <li>
                <Link to={Routes.Admin}>
                  <h3>Admin</h3>
                </Link>
              </li>
              <li>
                <Link to={Routes.AdminContentTitle}>
                  <h3>Create</h3>
                </Link>
              </li>
            </ul>
          </menu>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
