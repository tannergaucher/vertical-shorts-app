import { cssBundleHref } from "@remix-run/css-bundle";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLocation } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import appStyles from "./app.css";
import { Routes } from "./routes";
import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: appStyles,
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
  const location = useLocation();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {location.pathname === Routes.Signup ? (
          <script
            async
            src="https://js.stripe.com/v3/pricing-table.js"
          ></script>
        ) : null}
      </head>
      <body>
        <nav>
          <Link to={Routes.Index}>
            <h3>Content</h3>
          </Link>
          <menu>
            <ul>
              <li>
                <Link to={Routes.Admin}>
                  <h3>Settings</h3>
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
