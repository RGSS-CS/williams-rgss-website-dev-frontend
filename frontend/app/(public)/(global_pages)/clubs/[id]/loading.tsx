import clubStyles from "../clubs.module.css";
import detailStyles from "./club-detail.module.css";

const HERO_STATS = 4;
const INFO_TILES = 6;

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading club details">
      <section className="hero">
        <div className="hero_shape"></div>
        <div className="heroInner">
          <div className="hero_left">
            <div className={detailStyles.loadingBreadcrumbs}>
              <span className={clubStyles.skeletonBlock}></span>
              <span className={clubStyles.skeletonBlock}></span>
              <span className={clubStyles.skeletonBlock}></span>
            </div>
            <div className={detailStyles.loadingHeroTitle}>
              <span className={clubStyles.skeletonBlock}></span>
            </div>
            <div className={detailStyles.loadingHeroSubtitle}>
              <span className={clubStyles.skeletonBlock}></span>
              <span className={clubStyles.skeletonBlock}></span>
            </div>
            <div className={detailStyles.loadingHeroActions}>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingHeroButton}`}></span>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingHeroHint}`}></span>
            </div>
            <div className={clubStyles.heroStats}>
              {Array.from({ length: HERO_STATS }).map((_, index) => (
                <div className={clubStyles.heroStat} key={index}>
                  <span className={`${clubStyles.skeletonBlock} ${clubStyles.loadingStatNumber}`}></span>
                  <span className={`${clubStyles.skeletonBlock} ${clubStyles.loadingStatLabel}`}></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={detailStyles.aboutWrap}>
        <section className={detailStyles.section}>
          <div className={detailStyles.aboutGrid}>
            <div>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingEyebrow}`}></span>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingSectionTitle}`}></span>
              <div className={detailStyles.loadingSectionBody}>
                <span className={clubStyles.skeletonBlock}></span>
                <span className={clubStyles.skeletonBlock}></span>
                <span className={clubStyles.skeletonBlock}></span>
              </div>
              <div className={detailStyles.badgeRow}>
                <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingBadge}`}></span>
                <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingBadge}`}></span>
                <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingBadge}`}></span>
              </div>
            </div>

            <div className={`${detailStyles.aboutVisual} ${detailStyles.loadingAboutVisual}`}>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingVisualCaption}`}></span>
            </div>
          </div>
        </section>
      </div>

      <div className={`${detailStyles.divider} category-divider`}></div>

      <div className={detailStyles.infoWrap}>
        <section className={detailStyles.section}>
          <div className={detailStyles.headlineRow}>
            <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingHeadlineIcon}`}></span>
            <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingHeadlineText}`}></span>
          </div>

          <div className={detailStyles.infoGrid}>
            {Array.from({ length: INFO_TILES }).map((_, index) => (
              <article className={detailStyles.infoTile} key={index}>
                <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingTileIcon}`}></span>
                <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingTileTitle}`}></span>
                <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingTileText}`}></span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className={detailStyles.applySection}>
        <div className={detailStyles.applySectionShell}>
          <div className={detailStyles.applySectionCopy}>
            <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingApplyEyebrow}`}></span>
            <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingApplyTitle}`}></span>
            <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingApplyText}`}></span>
          </div>

          <div className={detailStyles.applyPanel}>
            <div className={detailStyles.applyPanelInner}>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingApplyRow}`}></span>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingApplyRow}`}></span>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingApplyCode}`}></span>
              <span className={`${clubStyles.skeletonBlock} ${detailStyles.loadingApplyButton}`}></span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
