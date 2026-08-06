import styles from '@/app/private/authentication/authentication.module.css';
import { signup } from "@/app/private/authentication/_methods/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

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
          <div className={styles.form_group}>
            <label htmlFor="student_number">Student Number</label>
            <div className={styles.input_wrap}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
              <input
                id="student_number"
                name="student_number"
                type="email"
                placeholder="Student Number"
              />
            </div>
          </div>
          <div className={styles.form_group}>
            <div>
              <label htmlFor="password">Password</label>
              <div className={styles.input_wrap}>
                <FontAwesomeIcon icon={faKey} className={styles.fas} />
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>
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