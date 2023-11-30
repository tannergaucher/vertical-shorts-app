import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { ContentDetails } from "~/components/content-details";
import { Layout } from "~/components/layout";
import { deleteContent, getContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Preview",
  };
};

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  user: Awaited<ReturnType<typeof getUser>>;
};

const paramsSchema = z.object({
  slug: z.string(),
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = paramsSchema.parse(params);

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  invariant(user?.currentProjectId, "user must have a current project");

  return json({
    user,
    content: await getContent({
      slug,
      projectId: user.currentProjectId,
    }),
  });
};

export const actionSchema = zfd.formData({
  slug: z.string(),
  projectId: z.string(),
});

export const action: ActionFunction = async ({ request }) => {
  const { slug, projectId } = actionSchema.parse(await request.formData());

  await deleteContent({
    slug,
    projectId,
  });

  return redirect(Routes.Index);
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  return (
    <Layout>
      <ContentDetails content={content} />
    </Layout>
  );
}
