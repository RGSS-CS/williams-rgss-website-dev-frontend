"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("authentication segment error:", error);
  }, [error]);

  return (
    <main className={styles.error_container}>
      <h1>Something went wrong loading this page.</h1>
      <p>This is usually temporary — please try again in a moment.</p>
      <button className={styles.retry_button} onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
