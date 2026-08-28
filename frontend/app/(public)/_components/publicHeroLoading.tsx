import styles from "@/app/(public)/_styles/loading/public-hero-loading.module.css";

type PublicHeroLoadingProps = {
  badge?: boolean;
  buttons?: boolean;
  search?: boolean;
  stats?: number;
  tag?: boolean;
  titleLines?: number;
  ticker?: boolean;
};

export default function PublicHeroLoading({
  badge = false,
  buttons = false,
  search = false,
  stats = 0,
  tag = false,
  titleLines = 2,
  ticker = false,
}: PublicHeroLoadingProps) {
  return (
    <div className='hero' aria-busy='true' aria-label='Loading hero'>
      {ticker && (
        <div className={styles.tickerBar}>
          <span className={styles.tickerHeader}></span>
        </div>
      )}

      {badge && (
        <div className={styles.heroBadgeImage}>
          <span className={`${styles.skeletonBlock} ${styles.badgeImage}`}></span>
        </div>
      )}

      <div className={badge ? styles.homeHeroShape : "hero_shape"}></div>
      <div className='hero_inner'>
        <div className='hero_left'>
          {tag && <span className={`${styles.skeletonBlock} ${styles.loadingHeroTag}`}></span>}

          <div className={styles.loadingHeroTitle}>
            {Array.from({ length: titleLines }).map((_, index) => (
              <span className={styles.skeletonBlock} key={index}></span>
            ))}
          </div>

          <div className={styles.loadingHeroSubtitle}>
            <span className={styles.skeletonBlock}></span>
            <span className={styles.skeletonBlock}></span>
          </div>

          {search && (
            <div className={styles.loadingSearch}>
              <span className={styles.loadingSearchIcon}></span>
              <span className={styles.skeletonBlock}></span>
            </div>
          )}

          {buttons && <span className={`${styles.skeletonBlock} ${styles.loadingHeroButtons}`}></span>}

          {stats > 0 && (
            <div className={styles.heroStats}>
              {Array.from({ length: stats }).map((_, index) => (
                <div className={styles.heroStat} key={index}>
                  <span className={`${styles.skeletonBlock} ${styles.loadingStatNumber}`}></span>
                  <span className={`${styles.skeletonBlock} ${styles.loadingStatLabel}`}></span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
