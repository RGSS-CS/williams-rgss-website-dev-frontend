import styles from '@/app/private/authentication/authentication.module.css'

export default function SignupForm() {
  return (
    <div className={styles.body}>
      <div className={`${styles.login_card} ${styles.register_card}`}>
        <div className={styles.card_header}>
          <h2>Please notify STUCO</h2>
          <p>Please register your account with STUCO first, then return to <a href="/private/authentication/login">login</a></p>
        </div>
      </div>
    </div>
  )
}