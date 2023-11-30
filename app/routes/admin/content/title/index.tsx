import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useNavigation, useParams } from "@remix-run/react";
import { zfd } from "zod-form-data";

import { Breadcrumb } from "~/components/breadcrumb";
import { Layout } from "~/components/layout";
import { upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Title",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  return json({
    user,
  });
};

const schema = zfd.formData({
  title: zfd.text(),
});

export const action: ActionFunction = async ({ request }) => {
  const { title } = schema.parse(await request.formData());

  const user = await getUser(request);

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const slug = title.toString().trim().toLowerCase().replace(/ /g, "-");

  await upsertContent({
    slug,
    title: title.trim(),
    projectId: user.currentProjectId,
  });

  return redirect(Routes.AdminContentVideo(slug));
};

export default function Page() {
  const transition = useNavigation();

  const { slug } = useParams();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <Layout h1="Publish" h2="Add your content title">
      <Breadcrumb slug={slug} />
      <fieldset disabled={disabled}>
        <Form method="post">
          <input type="text" name="title" placeholder="Title" required />
          <button type="submit" id="sticky-button">
            Next
          </button>
        </Form>
      </fieldset>
    </Layout>
  );
}
