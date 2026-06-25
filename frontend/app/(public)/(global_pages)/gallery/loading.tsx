import styles from "./gallery.module.css";

const filterChips = ["Academic", "Arts", "Community", "Sports", "Events"];
const categoryRows = ["Academic", "Arts", "Community", "Sports & Recreation", "Events"];

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading gallery">
      <div className="hero">
        <div className="hero_shape"></div>
        <div className="hero_inner">
          <div className="hero_left">
            <div className={styles.loadingHeroTitle}>
              <span className={styles.skeletonBlock}></span>
            </div>
            <div className={styles.loadingHeroSubtitle}>
              <span className={styles.skeletonBlock}></span>
              <span className={styles.skeletonBlock}></span>
            </div>
            <div className={styles.loadingSearch}>
              <span className={styles.loadingSearchIcon}></span>
              <span className={styles.skeletonBlock}></span>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-wrapper">
        <div className="filter_bar_container">
          <div className="filter_bar">
            <span className={`${styles.skeletonBlock} ${styles.loadingFilterLabel}`}></span>
            {filterChips.map((chip) => (
              <span
                className={`${styles.skeletonBlock} ${styles.loadingFilterChip}`}
                key={chip}
              ></span>
            ))}
          </div>
        </div>

        <div className="category_container">
          {categoryRows.map((category) => (
            <div className="category-section" key={category}>
              <div className="category-header">
                <div className="category-accent"></div>
                <span className={`${styles.skeletonBlock} ${styles.loadingCategoryTitle}`}></span>
                <div className="category-divider"></div>
                <span className={`${styles.skeletonBlock} ${styles.loadingCategoryCount}`}></span>
              </div>
              <div className={styles.loadingGalleryGrid}>
                <span className={`${styles.skeletonBlock} ${styles.loadingGalleryThumb}`}></span>
                <span className={`${styles.skeletonBlock} ${styles.loadingGalleryThumb}`}></span>
                <span className={`${styles.skeletonBlock} ${styles.loadingGalleryThumb}`}></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
