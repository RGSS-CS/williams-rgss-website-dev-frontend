"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/private/authentication/authentication.module.css";

export default function LoginBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <button
      type="button"
      className={styles.back_button}
      onClick={handleBack}
      aria-label="Go back"
    >
      <i className="fas fa-arrow-left"></i>
      Go Back
    </button>
  );
}
