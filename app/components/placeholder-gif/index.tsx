import * as React from "react";

import styles from "./styles.module.css";
import v1 from "./v1.gif";
import v2 from "./v2.gif";
import v3 from "./v3.gif";

export function PlaceholderGif({ version = 1 }: { version?: number }) {
  const [gifVersion, setGifVersion] = React.useState(version);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGifVersion((gifVersion) => {
        if (gifVersion === 3) {
          return 1;
        } else {
          return gifVersion + 1;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      className={styles.placeholderGif}
      src={
        gifVersion === 1
          ? v1
          : gifVersion === 2
          ? v2
          : gifVersion === 3
          ? v3
          : v1
      }
      alt="placeholder gif"
    />
  );
}
