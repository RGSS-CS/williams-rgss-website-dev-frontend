import clubStyles from "../clubs.module.css";
import heroLoadingStyles from "@/app/(public)/_styles/loading/public-hero-loading.module.css";
import styles from "./club-detail.module.css";
import dividerStyles from "@/app/(public)/_styles/utilities/section-divider.module.css";
import loadingStyles from "@/app/(public)/_styles/loading/club-detail-loading.module.css";

export default function Loading() {
    return (
        <main className={loadingStyles.loading} aria-busy="true" aria-label="Loading club details">
            <div className={loadingStyles.skeleton} aria-hidden="true">
                <section className="hero">
                    <div className="heroShape"></div>
                    <div className="heroInner">
                        <div className="heroLeft">
                            <div className={loadingStyles.loadingSiteDirectories}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className={loadingStyles.loadingHeroTitle}>
                                <span></span>
                            </div>

                            <div className={loadingStyles.loadingHeroSubtitle}>
                                <span></span>
                                <span></span>
                            </div>
                            <div className={clubStyles.heroStats}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div className={clubStyles.heroStat} key={index}>
                                        <span className={`${heroLoadingStyles.skeletonBlock} ${heroLoadingStyles.loadingStatNumber}`} />
                                        <span className={`${heroLoadingStyles.skeletonBlock} ${heroLoadingStyles.loadingStatLabel}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className={styles.aboutWrap}>
                    <section className={styles.section}>
                        <div className={styles.aboutGrid}>
                            <div>
                                <span className={loadingStyles.loadingEyebrow}></span>
                                <div className={loadingStyles.loadingSectionTitle}></div>
                                <div className={loadingStyles.loadingSectionBody}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className={`${styles.divider} ${dividerStyles.sectionDivider}`} aria-hidden="true"></div>

                <div className={styles.infoWrap}>
                    <section className={styles.infoSection}>
                        <div className={styles.infoHeader}>
                            <span className={loadingStyles.loadingEyebrow}></span>
                            <div className={loadingStyles.loadingSectionTitle}></div>
                        </div>

                        <div className={styles.infoGrid}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <article className={styles.infoTile} key={index}>
                                    <div className={loadingStyles.loadingTileTitle}></div>
                                    <div className={loadingStyles.loadingTileText}></div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <div className={loadingStyles.overlay}>
                <div className={loadingStyles.spinnerContainer} role="status">
                    <span className={loadingStyles.spinner} aria-hidden="true" />
                    <span className={loadingStyles.visuallyHidden}>Loading club details...</span>
                </div>
                </div>
            </main>
        );
    }
