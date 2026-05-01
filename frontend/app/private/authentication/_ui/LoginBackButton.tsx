"use client";

import { useRouter } from "next/navigation";

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
      className="nav-hamburger nav-back-button"
      onClick={handleBack}
      aria-label="Go back"
    >
      <i className="fas fa-arrow-left"></i>
    </button>
  );
}
