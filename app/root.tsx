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
import { useLoaderData } from "@remix-run/react";

import styles from "~/styles/index.css";
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
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user?: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const { user } = useLoaderData<LoaderData>();

  const currentProject = user?.projects.find(
    (project) => project.id === user.currentProjectId
  );

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav
          style={{
            display: "flex",
          }}
        >
          <h2
            style={{
              textOrientation: "upright",
              writingMode: "vertical-rl",
              margin: 0,
            }}
          >
            <Link
              to="/"
              style={{
                textTransform: "uppercase",
              }}
            >
              <b>CONTENT</b>
            </Link>
          </h2>

          <h2
            style={{
              textOrientation: "upright",
              writingMode: "vertical-rl",
              margin: 0,
            }}
          >
            <Link
              to="/"
              style={{
                textTransform: "uppercase",
              }}
            >
              <b>VERTICAL</b>
            </Link>
          </h2>

          <h2
            style={{
              textOrientation: "upright",
              writingMode: "vertical-rl",
              margin: 0,
            }}
          >
            <Link
              to="/"
              style={{
                textTransform: "uppercase",
              }}
            >
              <b>PUBLISHER</b>
            </Link>
          </h2>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
