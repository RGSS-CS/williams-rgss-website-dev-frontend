import Link from "next/link";

import type { Club } from "@/app/_lib/club";
import styles from "@/app/(public)/(global_pages)/clubs/clubs.module.css";

const DEFAULT_CATEGORY_ICON = "fas fa-layer-group";

const CATEGORY_ICON_MAP: Record<string, string> = {
  academic: "fas fa-book",
  arts: "fas fa-palette",
  community: "fas fa-hands-helping",
  sports: "fas fa-running",
  recreation: "fas fa-running",
  stem: "fas fa-flask",
  science: "fas fa-flask",
  technology: "fas fa-microchip",
  music: "fas fa-music",
  business: "fas fa-briefcase",
};

type VisibleSection = {
  name: string;
  slug: string;
  clubs: Club[];
};

type ClubsDirectoryProps = {
  visibleCategories: VisibleSection[];
};

function getCategoryIcon(category: string) {
  const words = category.toLowerCase().split(/[\s/&-]+/);

  for (const word of words) {
    if (CATEGORY_ICON_MAP[word]) {
      return CATEGORY_ICON_MAP[word];
    }
  }

  return DEFAULT_CATEGORY_ICON;
}

function ClubCard({ club }: { club: Club }) {
  return (
    <Link href={`/clubs/${club.id}`} className={styles.clubCardLink}>
      <article className={styles.club_card}>
        <div className={styles.club_card_name}>
          <h3>{club.name}</h3>
        </div>
        <div className={styles.club_card_meta}>

          <div className={styles.club_meta_row}>
            <i className="fas fa-map-marker-alt"></i>
            <h4>Room: {club.roomNumber}</h4>
          </div>          
          <div className={styles.club_meta_row}>
            <i className="fas fa-calendar-alt"></i>
            <h4>{club.repetition}: {club.dayOfMeeting} @ {club.time}</h4>
          </div>
        </div>
        <p className={styles.club_card_description}>
          {club.preview_description}
        </p>
        <div className={styles.club_card_divider}></div>
        <div className={styles.club_card_footer}>
          <span className={styles.open_club_btn}>
            View Details
            <i className="fas fa-arrow-right"></i>
            <span className={`${styles.club_tag} ${styles.open}`}></span>
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function ClubsDirectory({ visibleCategories }: ClubsDirectoryProps) {
  return (
    <>
      <div className="category_container">
        {visibleCategories.map((section) => (
          <div className="category-section" data-category={section.slug} id={`cat-${section.slug}`} key={section.slug}>
            <div className="category-header">
              <div className="category-accent"></div>
              <span className="category-title">
                <i className={getCategoryIcon(section.name)}></i>
                {section.name}
              </span>
              <div className="category-divider"></div>
              <span className="category-count">
                {section.clubs.length} club{section.clubs.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className={`cards-grid ${styles.clubCardsGrid}`}>
              {section.clubs.map((club) => (
                <ClubCard club={club} key={`${section.slug}-${club.id}`} />
              ))}
            </div>
          </div>
        ))}

        {visibleCategories.length === 0 && (
          <div className={styles.emptyState}>
            <i className="fas fa-search"></i>
            <h3>No Clubs Found</h3>
            <p>Try a different search term or clear your filters</p>
            <a href="/clubs" className="reset_link">Clear Filters</a>
          </div>
        )}
      </div>
    </>
  );
}
