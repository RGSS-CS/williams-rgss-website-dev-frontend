import { signin } from '@/app/private/authentication/_methods/auth'
import styles from '@/app/_modules/login.module.css'

export default function SigninForm() {
  return (
    <div className={styles.body}>
      <form action={signin}>
        <div className={styles.login_card}>
          <div className={styles.card_header}>
            <h2>Welcome back👋</h2>
            <p>Sign in to access the STUCO Dashboard</p>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="student_number">Student Number</label>
            <div className={styles.input_wrap}>
              <i className="fa-regular fa-envelope"></i>
              <input id="email" name="student_number" type="number" placeholder="Student Number" />
            </div>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <div className={styles.input_wrap}>
              <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
              <button className={styles.toggle_pw} id="togglePw" type="button" aria-label="Toggle password visibility">
                <i className="fa-regular fa-eye" id="toggleIcon"></i>
              </button>
            </div>
          </div>

          <button className={styles.btn_login} type="submit" id="loginBtn"><i className="fa-solid fa-arrow-right-to-bracket"></i>
            Sign In
          </button>
          <div className={styles.signUp}>
            <p>Don't have an account yet? <a href="/private/authentication/signup">Register Now!</a></p>
          </div>
        </div>
      </form>
    </div >
  )
}
