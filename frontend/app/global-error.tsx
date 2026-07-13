"use client";

import { useEffect } from "react";
import styles from "./global-error.module.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className={styles.error_container}>
          <h1>Something went wrong.</h1>
          <p>Please try again in a moment.</p>
          <button className={styles.retry_button} onClick={() => reset()}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
