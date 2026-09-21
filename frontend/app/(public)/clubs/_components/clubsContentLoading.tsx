import styles from "../clubs.module.css";
import loadingStyles from "@/app/(public)/_styles/loading/clubs-loading.module.css";
import catStyles from "@/app/(public)/_styles/sections/categories.module.css";

const CLUB_CARD_COUNT = 6;

export default function ClubsContentLoading() {
  return (
    <div aria-busy='true' aria-label='Loading clubs'>
      <div className='sticky-wrapper'>
        <div className={catStyles.categoryContainer}>
          <div className={catStyles.categorySection}>
            <div className={catStyles.categoryHeader}>
              <div className={catStyles.categoryAccent}></div>
              <span
                className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingCategoryTitle}`}
              ></span>
              <div className={catStyles.categoryDivider}></div>
              <span
                className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingCategoryCount}`}
              ></span>
            </div>
            <div className={catStyles.cardsGrid}>
              {Array.from({ length: CLUB_CARD_COUNT }).map((_, index) => (
                <article
                  className={`${styles.clubCard} ${loadingStyles.loadingClubCard}`}
                  key={index}
                >
                  <span
                    className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingClubName}`}
                  ></span>
                  <div className={styles.clubCardMeta}>
                    <span
                      className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingMetaRow}`}
                    ></span>
                    <span
                      className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingMetaRow}`}
                    ></span>
                  </div>
                  <span
                    className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingDescription}`}
                  ></span>
                  <div className={styles.clubCardDivider}></div>
                  <span
                    className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingCardAction}`}
                  ></span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ctaBanner}>
        <span className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingCtaTitle}`}></span>
        <span className={`${loadingStyles.skeletonBlock} ${loadingStyles.loadingCtaText}`}></span>
      </div>
    </div>
  );
}
