import { json, type LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Layout } from "~/components/layout";
import { getContents } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  user?: Awaited<ReturnType<typeof getUser>>;
  content?: Awaited<ReturnType<typeof getContents>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const content = await getContents({
    projectId: user.currentProjectId,
  });

  return json({
    user,
    content,
  });
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  return (
    <Layout h1="Content">
      <section>
        {content?.map((content) => (
          <article key={content.id}>
            {content.bucketUrl ? (
              <video autoPlay loop muted src={content.bucketUrl}></video>
            ) : null}
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}