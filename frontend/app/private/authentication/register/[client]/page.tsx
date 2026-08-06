import styles from '@/app/private/authentication/authentication.module.css';
import { signup } from "@/app/private/authentication/_methods/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import StudentNumberField from './_components/StudentNumberField';
import PasswordField from './_components/PasswordField';
import ConfirmPasswordField from './_components/ConfirmPasswordField';

export default function SignupForm() {
  return (
    <main>
      <div className={styles.body}>
        <form action={signup}>
          <div className={styles.login_card}>
            <div className={styles.card_header}>
              <h1>Register Now</h1>
              <p>Sign up for easy access to all features</p>
            </div>

            <StudentNumberField />
            <PasswordField />
            <ConfirmPasswordField />

            <button className={styles.btn_login} type="submit" id="loginBtn">
              <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
              Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}