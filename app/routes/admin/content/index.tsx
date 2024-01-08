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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content?.map((content) => (
          <article
            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4"
            key={content.id}
          >
            <div className="md:flex">
              {content.bucketUrl ? (
                <div className="md:flex-shrink-0">
                  <video
                    className="h-48 w-full object-cover md:w-48"
                    src={content.bucketUrl}
                  />
                </div>
              ) : null}
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {content.tags}
                </div>
                <a
                  href={Routes.AdminContentUpload(content.id)}
                  className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                >
                  {content.title}
                </a>
                <p className="mt-2 text-gray-500">{content.description}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
