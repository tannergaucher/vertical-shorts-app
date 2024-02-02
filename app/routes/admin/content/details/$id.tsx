import { type LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Layout } from "~/components/layout";
import { getContent } from "~/models/content.server";
import { getUser } from "~/session.server";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  if (!params.id) {
    return redirect("/admin/content");
  }

  return {
    content: await getContent({
      id: params.id,
    }),
  };
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  return (
    <Layout h1={content.title || "Untitled Content"}>
      {content.gif ? <img src={content.gif} alt="" /> : null}
      <p>{content.description}</p>
    </Layout>
  );
}
