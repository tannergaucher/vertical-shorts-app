import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { ContentDetails } from "~/components/content-details";
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
  actionType: zfd.text(z.enum([ActionType.AddTag, ActionType.RemoveTag])),
});

export const action: ActionFunction = async ({ request }) => {
  const { tag, actionType } = schema.parse(await request.formData());

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

  const tags =
    actionType === ActionType.RemoveTag
      ? [...project.tags.filter((t) => t !== tag.trim())]
      : Array.from(new Set([...project.tags, tag.trim()]));

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
  const [tagsFocused, setTagsFocused] = useState(false);
  const { contents, project } = useLoaderData<LoaderData>();

  const fetcher = useFetcher();

  const [selectedDetails, setSelectedDetails] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{project.title}</h1>
      <section className={styles.contentAsideGrid}>
        <section className={styles.contentGrid}>
          {contents?.map((content) => (
            <div
              key={content.slug}
              className={styles.contentCard}
              data-current={content.slug === selectedDetails}
            >
              {content.gif ? (
                <img src={content.gif} alt={content.title} />
              ) : null}
              <div className={styles.contentCardDetails}>
                <Link to={Routes.AdminContentStatus(content.slug)}>
                  <h3 className={styles.contentTitle}>{content.title}</h3>
                </Link>
                <ContentDetails
                  project={project}
                  content={content}
                  selectedDetails={selectedDetails}
                  setSelectedDetails={setSelectedDetails}
                  scrollIntoView
                />
              </div>
            </div>
          ))}
        </section>
        <section className={styles.asideSection}>
          <aside>
            <fieldset
              disabled={
                fetcher.state === "loading" || fetcher.state === "submitting"
              }
            >
              <Form method="post">
                <input
                  type="text"
                  placeholder="Add Tag"
                  name="tag"
                  id="tag"
                  onFocus={() => {
                    setSelectedDetails(null);
                    setTagsFocused(true);
                  }}
                />
                {tagsFocused ? (
                  <button
                    className={styles.submitButton}
                    onClick={(e) => {
                      const tagInputElement =
                        e.currentTarget.form?.elements.namedItem(
                          "tag"
                        ) as HTMLInputElement;

                      fetcher.submit(
                        {
                          actionType: ActionType.AddTag,
                          tag: tagInputElement.value,
                        },
                        {
                          method: "post",
                        }
                      );

                      tagInputElement.value = "";
                    }}
                  >
                    Add Tag
                  </button>
                ) : null}
                {project.tags.map((tag) => (
                  <div key={tag} className={styles.tag}>
                    <span>#{tag}</span>
                    <button
                      type="button"
                      className={styles.removeTagButton}
                      onClick={() =>
                        fetcher.submit(
                          {
                            actionType: ActionType.RemoveTag,
                            tag,
                          },
                          {
                            method: "post",
                          }
                        )
                      }
                    >
                      x
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
