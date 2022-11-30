import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <Link to="posts">
        <h2>Posts</h2>
      </Link>

      <Link to="projects">
        <h2>Projects</h2>
      </Link>

      <Link to="shop-products">
        <h2>Shop Products</h2>
      </Link>
    </main>
  );
}
