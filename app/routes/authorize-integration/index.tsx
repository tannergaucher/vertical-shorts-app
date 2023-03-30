import { Link } from "@remix-run/react";

export default function Page() {
  return (
    <main>
      <h1>Authorize Integration</h1>
      <ul>
        <Link to="youtube">
          <li>YouTube</li>
        </Link>
        <Link to="tiktok">
          <li>TikTok</li>
        </Link>
        <Link to="instagram">
          <li>Instagram</li>
        </Link>
      </ul>
    </main>
  );
}
