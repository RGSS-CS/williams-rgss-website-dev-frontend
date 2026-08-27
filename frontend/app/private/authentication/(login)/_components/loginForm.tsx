"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightToBracket, faEnvelope, faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import { signin } from "@/app/private/authentication/_methods/auth";
import Capcha from "@/app/_components/captcha";
import styles from "@/app/private/authentication/styles.module.css";
import type { Management } from "@/app/_lib/site-management";

type LoginFormProps = {
  management: Management;
  showCaptcha: boolean;
};

export default function LoginForm({ management, showCaptcha }: LoginFormProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className={styles.body}>
      <form action={signin}>
        <div className={styles.login_card}>
          <button type="button" className={styles.back_button} onClick={handleBack} aria-label="Go back">
            <FontAwesomeIcon icon={faArrowLeft} className={styles.fas} />
            Go Back
          </button>
          <div className={styles.card_header}>
            <h1>Welcome {management.schoolMascot}</h1>
            <p>Sign in to access the {management.councilName} Dashboard</p>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="student_number">YRDSB Email</label>
            <div className={styles.input_wrap}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
              <input id="student_number" name="student_number" type="email" placeholder="Student Number/Teacher Email" />
            </div>
          </div>
          <div className={styles.form_group}>
            <div>
              <label htmlFor="password">Password</label>
              <div className={styles.input_wrap}>
                <FontAwesomeIcon icon={faKey} className={styles.fas} />
                <input id="password" name="password" type={isVisible ? "text" : "password"} placeholder="Password" autoComplete="current-password" />
                <button type="button" className={styles.toggle_pw} onClick={() => setIsVisible((current) => !current)} aria-label={isVisible ? "Hide password" : "Show password"} aria-pressed={isVisible}>
                  <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} className={styles.fas} />
                </button>
              </div>
            </div>
          </div>
          {showCaptcha && <Capcha />}
          <button className={styles.btn_login} type="submit" id="loginBtn">
            <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
            Continue
          </button>
          <div className={styles.signUp}>
            <p><b>Don&apos;t have an account yet? </b></p>
            <h5>Sign up during the registration period. See announcements for more details.</h5>
          </div>
        </div>
      </form>
    </div>
  );
}
