import styles from "./gallery.module.css";
import catStyles from "@/app/(public)/_styles/sections/categories.module.css";
import filterStyles from "@/app/(public)/_styles/sections/filters.module.css";

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
                <div className={filterStyles.filterBarContainer}>
                    <div className={filterStyles.filterBar}>
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

                <div className={catStyles.categoryContainer}>
                    <div className={catStyles.categorySection}>
                        <div className={catStyles.categoryHeader}>
                            <div className={catStyles.categoryAccent}></div>
                            <span className={`${styles.skeletonBlock} ${styles.loadingCategoryTitle}`}></span>
                            <div className={catStyles.categoryDivider}></div>
                            <span className={`${styles.skeletonBlock} ${styles.loadingCategoryCount}`}></span>
                        </div>
                        <div className={catStyles.cardsGrid}>
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
