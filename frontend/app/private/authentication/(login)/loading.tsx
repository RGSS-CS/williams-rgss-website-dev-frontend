import styles from "@/app/private/authentication/authentication.module.css";

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading sign in">
      <div className={styles.body}>
        <div className={styles.login_card}>
          <span className={styles.skeletonBlock} style={{ width: 90, height: 32, marginBottom: 24 }}></span>
          <div className={styles.card_header}>
            <span className={styles.skeletonBlock} style={{ width: "70%", height: 24, marginBottom: 8 }}></span>
            <span className={styles.skeletonBlock} style={{ width: "90%", height: 14 }}></span>
          </div>
          <span className={styles.skeletonBlock} style={{ width: "100%", height: 46, marginBottom: 16 }}></span>
          <span className={styles.skeletonBlock} style={{ width: "100%", height: 46, marginBottom: 24 }}></span>
          <span className={styles.skeletonBlock} style={{ width: "100%", height: 44 }}></span>
        </div>
      </div>
    </main>
  );
}