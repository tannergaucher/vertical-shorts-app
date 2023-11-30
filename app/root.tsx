import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { zfd } from "zod-form-data";

import stylesheet from "../node_modules/@t_g/default-ui/package/index.css";
import { prisma } from "./db.server";
import { Routes } from "./routes";
import { getUser } from "./session.server";
import localStyles from "./styles/index.css";

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
    {
      rel: "stylesheet",
      href: localStyles,
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

type LoaderData = {
  user: ReturnType<typeof getUser> extends Promise<infer U> ? U : never;
};

const schema = zfd.formData({
  currentProjectId: zfd.text().optional(),
  userId: zfd.text().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const { currentProjectId, userId } = schema.parse(await request.formData());

  if (currentProjectId === "create-new-project") {
    return redirect(Routes.AdminCreateProject);
  }

  if (!userId) {
    throw new Error("Missing user");
  }

  const user = prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      currentProjectId,
    },
  });

  return user;
};

export async function loader({ request }: LoaderArgs) {
  return json<LoaderData>({ user: await getUser(request) });
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
