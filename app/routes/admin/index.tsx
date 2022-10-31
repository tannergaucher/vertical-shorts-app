import { Link } from "@remix-run/react";

export default function Admin() {
  return (
    <>
      <h1>Admin</h1>
      <hr />
      <Link to={`posts`}>
        <h2>Posts</h2>
      </Link>
      <hr />
      <Link to={`projects`}>
        <h2>Projects</h2>
      </Link>
    </>
  );
}
