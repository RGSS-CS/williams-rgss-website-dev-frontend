import styles from "./club-detail.module.css";

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading club details">
      <section className="hero">
        <div className="hero_shape"></div>
        <div className="heroInner">
          <div className="hero_left">
            <div className={styles.loadingBreadcrumbs}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className={styles.loadingHeroTitle}>
              <span></span>
            </div>

            <div className={styles.loadingHeroSubtitle}>
              <span></span>
              <span></span>
            </div>

            <div className={styles.loadingHeroActions}>
              <span className={styles.loadingHeroButton}></span>
              <span className={styles.loadingHeroHint}></span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.aboutWrap}>
        <section className={styles.section}>
          <div className={styles.aboutGrid}>
            <div>
              <span className={styles.loadingEyebrow}></span>
              <div className={styles.loadingSectionTitle}></div>
              <div className={styles.loadingSectionBody}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.badgeRow}>
                <span className={styles.loadingBadge}></span>
                <span className={styles.loadingBadge}></span>
                <span className={styles.loadingBadge}></span>
              </div>
            </div>

            <div className={`${styles.aboutVisual} ${styles.loadingAboutVisual}`}>
              <div className={styles.loadingVisualCaption}></div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.infoWrap}>
        <section className={styles.section}>
          <div className={styles.headlineRow}>
            <span className={styles.loadingHeadlineIcon}></span>
            <span className={styles.loadingHeadlineText}></span>
          </div>

          <div className={styles.infoGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <article className={styles.infoTile} key={index}>
                <span className={styles.loadingTileIcon}></span>
                <div className={styles.loadingTileTitle}></div>
                <div className={styles.loadingTileText}></div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.applySection} aria-labelledby="loading-join-club-heading">
        <div className={styles.applySectionShell}>
          <div className={styles.applySectionCopy}>
            <span className={styles.loadingApplyEyebrow}></span>
            <div className={styles.loadingApplyTitle}></div>
            <div className={styles.loadingApplyText}></div>
          </div>

          <div className={styles.applyPanel}>
            <div className={styles.applyPanelInner}>
              <div className={styles.applyInfoCard}>
                <div className={styles.applyInfoRow}>
                  <span className={styles.loadingApplyRow}></span>
                </div>
                <div className={styles.applyInfoRow}>
                  <span className={styles.loadingApplyRow}></span>
                </div>
              </div>

              <div className={styles.applyCodeCard}>
                <span className={styles.loadingApplyCode}></span>
              </div>

              <span className={styles.loadingApplyButton}></span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}