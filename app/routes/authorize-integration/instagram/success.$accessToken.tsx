import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderArgs) => {
  const { accessToken } = params;

  console.log(accessToken, "accessToken__");
};

export default function Page() {
  return (
    <main>
      <h1>Authorize Instagram Success</h1>
    </main>
  );
}
