import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { zfd } from "zod-form-data";

import { ContentStatus } from "~/components/content-status";
import { prisma } from "~/db.server";
import { getContents } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/index.module.css";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
  project: Awaited<ReturnType<typeof getProject>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const contents = await getContents({
    projectId: user.currentProjectId,
  });

  if (!contents.length) {
    return redirect(Routes.AdminContentTitle);
  }

  return json<LoaderData>({
    contents,
    project: await getProject({
      id: user.currentProjectId,
    }),
  });
};

enum ActionType {
  AddTag = "add-tag",
  RemoveTag = "remove-tag",
}

const schema = zfd.formData({
  tag: zfd.text(),
  actionType: zfd
    .text()
    .refine((value) => Object.values(ActionType).includes(value as ActionType)),
});

export const action: ActionFunction = async ({ request }) => {
  const { tag, actionType } = schema.parse(await request.formData());

  console.log(tag, "_tag");

  console.log(actionType, "_actionType");

  const user = await getUser(request);

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const project = await getProject({
    id: user.currentProjectId,
  });

  if (!project) {
    return redirect(Routes.AdminCreateProject);
  }

  const tags = Array.from(new Set([...project.tags, tag.trim()]));

  await prisma.project.update({
    where: {
      id: project.id,
    },
    data: {
      tags,
    },
  });

  return json({
    tags,
  });
};

export default function Page() {
  const { contents, project } = useLoaderData<LoaderData>();

  const submit = useSubmit();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{project.title}</h1>
      <section className={styles.contentAsideGrid}>
        <section className={styles.contentGrid}>
          {contents?.map((content) => (
            <div key={content.slug} className={styles.contentCard}>
              {content.gif ? (
                <img src={content.gif} alt={content.title} />
              ) : null}
              <div className={styles.contentCardDetails}>
                <Link to={Routes.AdminContentStatus(content.slug)}>
                  <h3 className={styles.contentTitle}>{content.title}</h3>
                </Link>
                <ContentStatus project={project} content={content} />
              </div>
            </div>
          ))}
        </section>
        <section className={styles.asideSection}>
          <aside>
            <fieldset>
              <Form method="post">
                <input type="text" placeholder="Add Tag" name="tag" />
                <button
                  className={styles.submitButton}
                  onClick={(e) =>
                    submit({
                      actionType: ActionType.AddTag,
                    })
                  }
                >
                  Add Tag
                </button>
                {project.tags.map((tag) => (
                  <div key={tag} className={styles.tag}>
                    <span>{tag}</span>
                    <button
                      type="button"
                      className={styles.removeTagButton}
                      onClick={() =>
                        submit({
                          actionType: ActionType.RemoveTag,
                          tag,
                        })
                      }
                    >
                      X
                    </button>
                  </div>
                ))}
              </Form>
            </fieldset>
          </aside>
        </section>
      </section>
    </main>
  );
}
