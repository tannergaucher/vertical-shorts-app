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

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <Link to={Routes.Index}>
            <h2>
              <em>
                <b>Posts</b>
              </em>
            </h2>
          </Link>
          <Link to={Routes.AdminContentTitle}>
            <h2>
              <em>
                <b>Publisher</b>
              </em>
            </h2>
          </Link>
          <Link to={Routes.Admin}>
            <h2>
              <em>
                <b>Settings</b>
              </em>
            </h2>
          </Link>
          {user ? null : (
            <Link
              to={Routes.Login}
              style={{
                textDecoration: "none",
              }}
            >
              <h2>
                <em>
                  <b>Login</b>
                </em>
              </h2>
            </Link>
          )}
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
