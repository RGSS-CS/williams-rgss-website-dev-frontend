import styles from "@/app/private/authentication/authentication.module.css";

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading sign in">
      <div className={styles.body}>
        <div className={styles.login_card}>
          <span className={`${styles.skeletonBlock} ${styles.skeleton_back}`}></span>
          <div className={styles.card_header}>
            <span className={`${styles.skeletonBlock} ${styles.skeleton_title}`}></span>
            <span className={`${styles.skeletonBlock} ${styles.skeleton_subtitle}`}></span>
          </div>
          <span className={`${styles.skeletonBlock} ${styles.skeleton_field}`}></span>
          <span className={`${styles.skeletonBlock} ${styles.skeleton_field_last}`}></span>
          <span className={`${styles.skeletonBlock} ${styles.skeleton_action}`}></span>
        </div>
      </div>
    </main>
  );
}