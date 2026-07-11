import Link from "next/link";
import { signin } from "@/app/private/authentication/_methods/auth";
import styles from "@/app/private/authentication/authentication.module.css";
import LoginBackButton from "../_components/LoginBackButton";
import { getManagementSettings } from "@/app/_lib/management";
import { Suspense } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//ICONS
import { faEnvelope, faKey, faArrowRightToBracket, faEye } from '@fortawesome/free-solid-svg-icons'

async function SigninContent() {
  const management = await getManagementSettings();
  if (!management) return null;
  return (
    <div className={styles.body}>

      <form action={signin}>
        <div className={styles.login_card}>
          <LoginBackButton />
          <div className={styles.card_header}>
            <h1>Welcome {management.schoolMascot}</h1>
            <p>Sign in to access the {management.councilName} Dashboard</p>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="student_number">YRDSB Email</label>
            <div className={styles.input_wrap}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
              <input
                id="student_number"
                name="student_number"
                type="email"
                placeholder="Student Number/Teacher Email"
              />
            </div>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <div className={styles.input_wrap}>
              <FontAwesomeIcon icon={faKey} className={styles.fas} />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button
                className={styles.toggle_pw}
                id="togglePw"
                type="button"
                aria-label="Toggle password visibility"
              >
                <FontAwesomeIcon icon={faEye} className={styles.fas} />
              </button>
            </div>
          </div>

          <button className={styles.btn_login} type="submit" id="loginBtn">
            <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
            Sign In
          </button>
          <div className={styles.signUp}>
            <p>
              Don&apos;t have an account yet?{" "}
              <Link href="/private/authentication/register">Register Now!</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function SigninForm() {
  return (
    <main>
      <Suspense fallback={null}>
        <SigninContent />
      </Suspense>
    </main>
  );
}