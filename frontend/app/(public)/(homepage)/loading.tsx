import PublicHeroLoading from "@/app/(public)/_components/publicHeroLoading";
import loadingStyles from "@/app/(public)/_styles/loading/public-hero-loading.module.css";
import styles from "./home.module.css";

const SECTION_COUNT = 3;

export default function Loading() {
    return (
        <main aria-busy='true' aria-label='Loading homepage'>
            <PublicHeroLoading badge buttons tag ticker />

            {Array.from({ length: SECTION_COUNT }).map((_, index) => (
                <div className={styles.sectionWrap} key={index}>
                    <div className={styles.sectionContent}>
                        <div className={styles.sectionTitleRow}>
                            <span className={`${loadingStyles.skeletonBlock} ${styles.loadingSectionTitle}`}></span>
                        </div>
                        <div className={styles.cardContainer}>
                            <span className={`${loadingStyles.skeletonBlock} ${styles.loadingSectionBlock}`}></span>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}
