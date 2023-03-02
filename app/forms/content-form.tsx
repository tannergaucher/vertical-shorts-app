import { Form } from "@remix-run/react";
import type { Content } from "~/models/content.server";

export type ContentActionData = Pick<
  Content,
  "title" | "description" | "thumbnail" | "video"
> & {
  slug?: string;
};

export type ContentActionErrorData = {
  [key in keyof ContentActionData]?: string;
};

export function ContentForm(props: {
  content?: ContentActionData;
  errors?: ContentActionErrorData;
  submitText: string;
}) {
  const { content, errors } = props;

  const thumbnail = content?.thumbnail ?? undefined;
  const video = content?.video ?? undefined;

  console.log({ thumbnail, video });

  return (
    <Form method="post" encType="multipart/form-data">
      <label>
        Title{" "}
        {errors?.title ? (
          <em className="warning-text">{errors.title}</em>
        ) : null}
        <input
          name="title"
          type="text"
          defaultValue={content?.title}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        Thumbnail JPG{" "}
        {errors?.thumbnail ? (
          <em className="warning-text">{errors.thumbnail}</em>
        ) : null}
        <input
          name="thumbnail"
          type="file"
          aria-label="Upload Image"
          accept="image/jpeg"
          defaultValue={thumbnail}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        Video MP4{" "}
        {errors?.video ? (
          <em className="warning-text">{errors.video}</em>
        ) : null}
        <input
          name="video"
          type="file"
          aria-label="Upload Video"
          accept="video/mp4"
          defaultValue={video}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        Description{" "}
        {errors?.description ? (
          <em className="warning-text">{errors.description}</em>
        ) : null}
        <textarea
          id="description"
          name="description"
          defaultValue={content?.description ?? ""}
          style={{ width: "100%", height: "20rem" }}
        ></textarea>
      </label>
      <button type="submit" style={{ width: `100%`, textAlign: `left` }}>
        {props.submitText}
      </button>
    </Form>
  );
}
