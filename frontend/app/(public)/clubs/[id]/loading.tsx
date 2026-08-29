import styles from "./club-detail.module.css";
import loadingStyles from "@/app/(public)/_styles/loading/club-detail-loading.module.css";

export default async function Loading() {
    return (
        <main aria-busy="true" aria-label="Loading club details">
            <section className="hero">
                <div className="hero_shape"></div>
                <div className="heroInner">
                    <div className="hero_left">
                        <div className={loadingStyles.loadingBreadcrumbs}>
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

                        <div className={loadingStyles.loadingHeroActions}>
                            <span className={loadingStyles.loadingHeroButton}></span>
                            <span className={loadingStyles.loadingHeroHint}></span>
                            <div className={loadingStyles.loadingHeroStats}>
                                <span className={loadingStyles.loadingHeroStat}></span>
                                <span className={loadingStyles.loadingHeroStat}></span>
                                <span className={loadingStyles.loadingHeroStat}></span>
                                <span className={loadingStyles.loadingHeroStat}></span>
                            </div>
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
                            <div className={styles.badgeRow}>
                                <span className={loadingStyles.loadingBadge}></span>
                                <span className={loadingStyles.loadingBadge}></span>
                                <span className={loadingStyles.loadingBadge}></span>
                            </div>
                        </div>

                        <div className={`${styles.aboutVisual} ${loadingStyles.loadingAboutVisual}`}>
                            <div className={loadingStyles.loadingVisualCaption}></div>
                        </div>
                    </div>
                </section>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.infoWrap}>
                <section className={styles.section}>
                    <div className={styles.headlineRow}>
                        <span className={loadingStyles.loadingHeadlineIcon}></span>
                        <span className={loadingStyles.loadingHeadlineText}></span>
                    </div>

                    <div className={styles.infoGrid}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <article className={styles.infoTile} key={index}>
                                <span className={loadingStyles.loadingTileIcon}></span>
                                <div className={loadingStyles.loadingTileTitle}></div>
                                <div className={loadingStyles.loadingTileText}></div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>

            <section className={styles.applySection} aria-labelledby="loading-join-club-heading">
                <div className={styles.applySectionShell}>
                    <div className={styles.applySectionCopy}>
                        <h2 id="loading-join-club-heading" className={loadingStyles.visuallyHidden}>
                            Loading join club details
                        </h2>
                        <span className={loadingStyles.loadingApplyEyebrow}></span>
                        <div className={loadingStyles.loadingApplyTitle}></div>
                        <div className={loadingStyles.loadingApplyText}></div>
                    </div>

                    <div className={styles.applyPanel}>
                        <div className={styles.applyPanelInner}>
                            <div className={styles.applyInfoCard}>
                                <div className={styles.applyInfoRow}>
                                    <span className={loadingStyles.loadingApplyRow}></span>
                                </div>
                                <div className={styles.applyInfoRow}>
                                    <span className={loadingStyles.loadingApplyRow}></span>
                                </div>
                            </div>

                            <div className={styles.applyCodeCard}>
                                <span className={loadingStyles.loadingApplyCode}></span>
                            </div>

                            <span className={loadingStyles.loadingApplyButton}></span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
