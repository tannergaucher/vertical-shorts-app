import { Link } from "@remix-run/react";

export default function Page() {
  return (
    <main>
      <h1>Authorize Integration</h1>
      <ul>
        <Link to="youtube">
          <li>YouTube</li>
        </Link>
        <Link to="tik-tok">
          <li>Tik Tok</li>
        </Link>
        <Link to="facebook-and-instagram">
          <li>Facebook and Instagram</li>
        </Link>
      </ul>
    </main>
  );
}
