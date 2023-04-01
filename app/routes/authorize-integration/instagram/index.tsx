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
      <button
        onClick={() => {
          FB.login(
            function (response) {
              console.log(response, "__response__");
            },
            { scope: "instagram_content_publish" }
          );
        }}
      >
        LOGIN
      </button>
    </main>
  );
}
