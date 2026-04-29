import { signin } from '@/app/private/authentication/_methods/auth'
import styles from '@/app/_modules/login.modules.css'

export function SigninForm() {
  return (
    <form action={signin}>
      <div className={styles.login_card}>
        <div className={styles.card_header}>
          <h2>Welcome back👋</h2>
          <p>Sign in to access the STUCO Dashboard</p>
        </div>

        <div className={styles.form_group}>
          <label htmlFor="student_number">Student Number</label>
          <input id="email" name="student_number" type="number" placeholder="Student Number" />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          <button className={styles.toggle_pw} id="togglePw" type="button" aria-label="Toggle password visibility">
            <i className="fa-regular fa-eye" id="toggleIcon"></i>
          </button>

        </div>
        <button className={styles.btn_login} type="submit" id="loginBtn" onClick={signin}><i className="fa-solid fa-arrow-right-to-bracket"></i>
          Sign Up
        </button>
      </div>
    </form>
  )
}