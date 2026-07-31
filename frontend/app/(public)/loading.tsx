import styles from "./home.module.css";

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading page">
      <div className="hero">
        <div className="hero_shape"></div>
        <div className="hero_inner">
          <div className="hero_left">
            <span className={`${styles.skeletonBlock} ${styles.loadingHeroTag}`}></span>
            <div className="hero_title">
              <span className={styles.skeletonBlock}></span>
            </div>
            <span className={`${styles.skeletonBlock} ${styles.loadingHeroTitle}`}></span>
            <span className={`${styles.skeletonBlock} ${styles.loadingHeroSubtitle}`}></span>
            <span className={`${styles.skeletonBlock} ${styles.loadingHeroButtons}`}></span>
          </div>
        </div>
      </div>
    </main>
  );
}