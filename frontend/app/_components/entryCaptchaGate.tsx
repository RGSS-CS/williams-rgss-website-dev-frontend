"use client";

import { useState } from "react";
import Captcha from "./captcha";
import { ENTRY_CAPTCHA_COOKIE } from "../_lib/captcha";
import styles from "./entryCaptchaGate.module.css";

type EntryCaptchaGateProps = {
  enabled: boolean;
  initialComplete: boolean;
  schoolName?: string;
  children: React.ReactNode;
};

function rememberCaptchaCompletion(): void {
  try {
    document.cookie = `${ENTRY_CAPTCHA_COOKIE}=true; Max-Age=31536000; Path=/; SameSite=Lax`;
  } catch {
    // The gate still works for the current render when storage is unavailable.
  }
}

export default function EntryCaptchaGate({
  enabled,
  initialComplete,
  schoolName,
  children,
}: EntryCaptchaGateProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!enabled || initialComplete) {
    return children;
  }

  return (
    <main className={styles.page} aria-labelledby='entry-captcha-title'>
      <section className={styles.card} aria-describedby='entry-captcha-description'>
        <p className={styles.eyebrow}>{schoolName || "School Council Website"}</p>
        <h1 className={styles.title} id='entry-captcha-title'>
          Security check
        </h1>
        <p className={styles.description} id='entry-captcha-description'>
          Please confirm that you are human before entering the website.
        </p>
        <div className={styles.challenge} aria-live='polite'>
          {isTransitioning ? (
            <div className={styles.transitionState} aria-busy='true'>
              <span className={styles.spinner} aria-hidden='true' />
              <span>Loading website...</span>
            </div>
          ) : (
            <Captcha
              className={styles.captcha}
              errorClassName={styles.error}
              loadingClassName={styles.captchaLoading}
              onSolve={() => {
                rememberCaptchaCompletion();
                setIsTransitioning(true);
                window.location.reload();
              }}
            />
          )}
        </div>
        <p className={styles.privacyNote}>
          This check helps keep the {schoolName || "website"} available for the school community.
        </p>
      </section>
    </main>
  );
}
