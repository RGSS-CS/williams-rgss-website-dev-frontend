"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/private/authentication/authentication.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//ICONS
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
      <FontAwesomeIcon icon={faArrowLeft} className={styles.fas} />
      Go Back
    </button>
  );
}
