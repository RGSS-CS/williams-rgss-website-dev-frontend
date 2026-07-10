import styles from "./gallery.module.css";

const FILTER_CHIP_COUNT = 6;
const THUMBNAIL_COUNT = 8;

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading gallery">
      <section className="hero">
        <div className="hero_shape"></div>
        <div className="hero_inner">
          <div className="hero_left">
            <div className={styles.loadingHeroTitle}>
              <span className="skeletonBlock"></span>
            </div>
            <div className={styles.loadingHeroSubtitle}>
              <span className="skeletonBlock"></span>
              <span className="skeletonBlock"></span>
            </div>
            <div className={styles.loadingSearch}>
              <span className={styles.loadingSearchIcon}></span>
              <span className="skeletonBlock"></span>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky-wrapper">
        <div className="filter_bar_container">
          <div className="filter_bar">
            <span className={`${styles.skeletonBlock} ${styles.loadingFilterLabel}`}></span>
            {Array.from({ length: FILTER_CHIP_COUNT }).map((_, index) => (
              <span
                className={`${styles.skeletonBlock} ${styles.loadingFilterChip}`}
                key={index}
              ></span>
            ))}
            <span className={`${styles.skeletonBlock} ${styles.loadingCategoryCount}`}></span>
          </div>
        </div>

        <div className="category_container">
          <div className="category_section">
            <div className="category_header">
              <div className="category_accent"></div>
              <span className={`${styles.skeletonBlock} ${styles.loadingCategoryTitle}`}></span>
              <div className="category_divider"></div>
              <span className={`${styles.skeletonBlock} ${styles.loadingCategoryCount}`}></span>
            </div>
            <div className={`cards_grid ${styles.loadingGalleryGrid}`}>
              {Array.from({ length: THUMBNAIL_COUNT }).map((_, index) => (
                <div className={styles.loadingGalleryThumb} key={index}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}