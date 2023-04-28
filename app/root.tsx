import { Link, useNavigate } from "@remix-run/react";
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
import styles from "semantic-styles/index.css";

import { getUser } from "./session.server";
import { Routes } from "./routes";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: styles,
      type: "text/css",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const navigate = useNavigate();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav
          className="padding"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to={Routes.Index}>
            <h3>Shorts Publisher</h3>
          </Link>
          <Link to={Routes.Admin}>
            <h3>Admin</h3>
          </Link>
        </nav>
        <div className="container">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <button
          style={{
            position: "fixed",
            bottom: 0,
            right: `var(--space-md)`,
          }}
          onClick={() => {
            navigate(Routes.AdminContentTitle);
          }}
        >
          Publish
        </button>
      </body>
    </html>
  );
}
