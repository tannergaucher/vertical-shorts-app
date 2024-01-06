import type { Content } from "~/models/content.server";

export function ContentDetails({ content }: { content: Content }) {
  return (
    <article>
      <video
        style={{
          borderTopLeftRadius: `var(--radius)`,
          borderTopRightRadius: `var(--radius)`,
        }}
        src={`https://storage.googleapis.com/${content.projectId}/${content.id}.mp4`}
        controls
      ></video>

      <section style={{ marginBlockStart: `var(--space-sm)` }}>
        <article>
          <h3>YouTube</h3>
          <ul style={{ paddingLeft: `var(--space-md)` }}>
            <li>Status: {content.youtubeStatus}</li>
            {content.youtubePublishAt ? (
              <li>Publish at: {content.youtubePublishAt}</li>
            ) : null}{" "}
            {content.youtubeId ? (
              <li>
                <a
                  href={`https://www.youtube.com/watch?v=${content.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Youtube Id: {content.youtubeId}
                </a>
              </li>
            ) : null}
          </ul>
        </article>
        <article>
          <h3>TikTok</h3>
          <ul>
            <li>Status: {content.tikTokStatus}</li>
            {content.tikTokPublishAt ? (
              <li>Publish at: {content.tikTokPublishAt}</li>
            ) : null}
            {content.tikTokId ? (
              <li>
                <a
                  href={`https://www.tiktok.com/@${content.tikTokId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok Id: {content.tikTokId}
                </a>
              </li>
            ) : null}
          </ul>
        </article>
      </section>
    </article>
  );
}
