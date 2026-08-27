import styles from "./clubs.module.css";
import catStyles from "@/app/(public)/_styles/sections/categories.module.css";
import filterStyles from "@/app/(public)/_styles/sections/filters.module.css";

const FILTER_CHIP_COUNT = 8;
const CLUB_CARD_COUNT = 6;

export default function Loading() {
    return (
        <main aria-busy="true" aria-label="Loading clubs">
            <div className="hero">
                <div className="hero_shape"></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className={styles.loadingHeroTitle}>
                            <span className={styles.skeletonBlock}></span>
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
                        <div className={styles.heroStats}>
                            <div className={styles.heroStat}>
                                <span className={`${styles.skeletonBlock} ${styles.loadingStatNumber}`}></span>
                                <span className={`${styles.skeletonBlock} ${styles.loadingStatLabel}`}></span>
                            </div>
                            <div className={styles.heroStat}>
                                <span className={`${styles.skeletonBlock} ${styles.loadingStatNumber}`}></span>
                                <span className={`${styles.skeletonBlock} ${styles.loadingStatLabel}`}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <span className={`${styles.skeletonBlock} ${styles.loadingResultsCount}`}></span>
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
                            {Array.from({ length: CLUB_CARD_COUNT }).map((_, index) => (
                                <article className={`${styles.clubCard} ${styles.loadingClubCard}`} key={index}>
                                    <span className={`${styles.skeletonBlock} ${styles.loadingClubName}`}></span>
                                    <div className={styles.clubCardMeta}>
                                        <span className={`${styles.skeletonBlock} ${styles.loadingMetaRow}`}></span>
                                        <span className={`${styles.skeletonBlock} ${styles.loadingMetaRow}`}></span>
                                    </div>
                                    <span className={`${styles.skeletonBlock} ${styles.loadingDescription}`}></span>
                                    <div className={styles.clubCardDivider}></div>
                                    <span className={`${styles.skeletonBlock} ${styles.loadingCardAction}`}></span>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.ctaBanner}>
                <span className={`${styles.skeletonBlock} ${styles.loadingCtaTitle}`}></span>
                <span className={`${styles.skeletonBlock} ${styles.loadingCtaText}`}></span>
            </div>
        </main>
    );
}
