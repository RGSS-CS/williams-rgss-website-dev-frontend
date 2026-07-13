import styles from "./navigation.module.css";
import loadingStyles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.navbar_container}>
      <nav className={styles.navbar} aria-busy="true" aria-label="Loading navigation">
        <div className={styles.header_container}>
          <div className={styles.title_container}>
            <div className={`${styles.nav_hamburger} ${loadingStyles.skeletonBlock}`} aria-hidden="true" />
            <div className={styles.brand_link}>
              <div className={`${styles.logo} ${loadingStyles.skeletonBlock}`} aria-hidden="true" />
              <div className={styles.brand_copy}>
                <span className={`${loadingStyles.skeletonBlock} ${loadingStyles.line}`} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className={styles.nav_links} aria-hidden="true">
            <div className={`${loadingStyles.skeletonBlock} ${loadingStyles.linkPill}`} />
            <div className={`${loadingStyles.skeletonBlock} ${loadingStyles.linkPill}`} />
            <div className={`${loadingStyles.skeletonBlock} ${loadingStyles.linkPill}`} />
            <div className={`${loadingStyles.skeletonBlock} ${loadingStyles.linkPill}`} />
          </div>
        </div>
      </nav>
    </div>
  );
}
