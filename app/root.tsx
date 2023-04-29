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
          style={{
            position: "sticky",
            top: 0,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: `var(--bg-1)`,
          }}
        >
          <Link to={Routes.Index}>
            <h3>Shorts Publisher</h3>
          </Link>
          <section
            style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              alignItems: `baseline`,
              marginBlockStart: `var(--space-sm)`,
            }}
          >
            <button
              onClick={() => {
                navigate(Routes.Admin);
              }}
            >
              Admin
            </button>
            <button
              className="primary"
              onClick={() => {
                navigate(Routes.AdminContentTitle);
              }}
            >
              Create
            </button>
          </section>
        </nav>
        <div className="container">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
