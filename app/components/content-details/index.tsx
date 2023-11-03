import type { Content } from "~/models/content.server";

export function ContentDetails({ content }: { content: Content }) {
  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        marginBlockStart: "var(--space-xl)",
      }}
    >
      <article>
        <video
          style={{
            borderTopLeftRadius: `var(--radius)`,
            borderTopRightRadius: `var(--radius)`,
          }}
          src={`https://storage.googleapis.com/${content.projectId}/${content.slug}.mp4`}
          controls
        ></video>

        <section style={{ marginBlockStart: `var(--space-sm)` }}>
          <article>
            <h3>YouTube</h3>
            <ul style={{ paddingLeft: `var(--space-md)` }}>
              <li>{content.youtubeStatus}</li>
              {content.youtubePublishAt ? (
                <li>{content.youtubePublishAt}</li>
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
              {content.tikTokPublishAt ? (
                <li>{content.tikTokPublishAt}</li>
              ) : null}
              <li>{content.tikTokPublishAt}</li>
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
    </main>
  );
}
