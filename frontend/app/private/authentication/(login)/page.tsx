import Link from "next/link";
import { signin } from "@/app/private/authentication/_methods/auth";
import styles from "@/app/private/authentication/authentication.module.css";
import LoginBackButton from "../_components/LoginBackButton";
import PasswordField from "../_components/PasswordField";
import { getManagementSettings } from "@/app/_lib/management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//ICONS
import { faEnvelope, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Authentication");
}

export default async function SigninForm() {
  const management = await getManagementSettings();
  if (!management) return null;
  return (
    <main>
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

            <PasswordField />

            <button className={styles.btn_login} type="submit" id="loginBtn">
              <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
              Continue
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
    </main>
  );
}
