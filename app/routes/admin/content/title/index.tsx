import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useParams, useTransition } from "@remix-run/react";
import { zfd } from "zod-form-data";

import { Breadcrumb } from "~/components/breadcrumb";
import { upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContent.module.css";

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

  return null;
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
  const transition = useTransition();

  const { slug } = useParams();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main className={styles.main}>
      <fieldset disabled={disabled} className={styles.fieldset}>
        <Breadcrumb slug={slug} />
        <Form method="post">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className={styles.input}
          />
          <button type="submit">Next</button>
        </Form>
      </fieldset>
    </main>
  );
}
