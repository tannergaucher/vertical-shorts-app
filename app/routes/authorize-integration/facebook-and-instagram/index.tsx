// POST to IG User Media
import { Form } from "@remix-run/react";

export const action = () => {
  //
};

export default function Page() {
  return (
    <main>
      <h1>Authorize Instagram and Facebook</h1>
      <Form>
        <button type="submit">Authorize</button>
      </Form>
    </main>
  );
}
