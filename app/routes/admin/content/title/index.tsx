import { Form, useTransition } from "@remix-run/react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import invariant from "tiny-invariant";
import { Breadcrumb } from "~/components/breadcrumb";

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");

  invariant(typeof title === "string", "title is required");

  const user = await getUser(request);

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const slug = title.toString().trim().toLowerCase().replace(/ /g, "-");

  await upsertContent({
    slug,
    title: title.toString().trim(),
    projectId: user.currentProjectId,
  });

  return redirect(Routes.AdminContentThumbnail(slug));
};

export default function Page() {
  const transition = useTransition();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main className={styles.main}>
      <fieldset disabled={disabled} className={styles.fieldset}>
        <Breadcrumb />
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
