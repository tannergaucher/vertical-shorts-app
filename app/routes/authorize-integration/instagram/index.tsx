import { Form } from "@remix-run/react";
import { useLayoutEffect } from "react";

export const action = () => {};

export default function Page() {
  useLayoutEffect(() => {
    FB.init({
      appId: "6261998800593353",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v16.0",
    });

    FB.getLoginStatus(function (response) {
      console.log(response, "_response__");
    });
  }, []);

  return (
    <main>
      <h1>Authorize Instagram</h1>
      <Form>
        <div
          className="fb-login-button"
          data-width="100px"
          data-size=""
          data-button-type=""
          data-layout=""
          data-auto-logout-link="false"
          data-use-continue-as="true"
        ></div>
      </Form>
    </main>
  );
}
