"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import type { Club } from "@/app/_lib/club";
import styles from "@/app/(public)/clubs/clubs.module.css";
import ResponsiveFilterPanel from "@/app/(public)/_components/ResponsiveFilterPanel";

import ClubSearchInput from "./ClubSearchInput";
import ClubsFilterControls, { type CategoryFilter } from "./ClubsFilterControls";
import ResetFiltersButton from "./ResetFiltersButton";

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

type ClubsDirectoryProps = {
  clubs: Club[];
};

function slugifyCategory(category: string) {
  return category
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryIcon(category: string) {
  const words = category.toLowerCase().split(/[\s/&-]+/);

  for (const word of words) {
    if (CATEGORY_ICON_MAP[word]) {
      return CATEGORY_ICON_MAP[word];
    }
  }

  return DEFAULT_CATEGORY_ICON;
}

function formatDayChip(day: string | null) {
  const normalized = day?.slice(0, 3).toLowerCase();
  const map: Record<string, string> = {
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
  };

  return normalized ? map[normalized] ?? "All Days" : "All Days";
}

function matchesQuery(club: Club, query: string) {
  const searchable = [
    club.name,
    club.preview_description,
    club.description,
    club.teacherAdvisor ?? "",
    club.roomNumber ?? "",
    club.dayOfMeeting ?? "",
    club.time ?? "",
    club.repetition ?? "",
    club.categories.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query.toLowerCase());
}

function ClubCard({ club }: { club: Club }) {
  return (
    <Link href={`/clubs/${club.id}`} className={styles.clubCardLink}>
      <article className={styles.club_card}>
        <div className={styles.club_card_name}>
          <h3>{club.name}</h3>
        </div>
        <div className={styles.club_meta}></div>
          <div className={styles.club_meta_row}>
            <i className="fas fa-calendar-alt"></i>
            <h4>{club.repetition}: {club.dayOfMeeting} @ {club.time}</h4>
          </div>
          <div className={styles.club_meta_row}>
            <i className="fas fa-map-marker-alt"></i>
          <h4>{club.roomNumber}</h4>
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

export default function ClubsDirectory({ clubs }: ClubsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDay, setActiveDay] = useState("All Days");
  const deferredQuery = useDeferredValue(query);

  const categories = Array.from(
    new Set(clubs.flatMap((club) => club.categories).filter(Boolean)),
  ).sort((left, right) => left.localeCompare(right));

  const categoryFilters: CategoryFilter[] = [
    { value: "all", label: "All Clubs" },
    ...categories.map((category) => ({
      value: slugifyCategory(category),
      label: category,
      iconClass: getCategoryIcon(category),
    })),
  ];

  const filteredClubs = clubs.filter((club) => {
    const clubCategorySlugs = club.categories.map(slugifyCategory);
    const matchesCategory =
      activeCategory === "all" || clubCategorySlugs.includes(activeCategory);
    const matchesDayFilter =
      activeDay === "All Days" || formatDayChip(club.dayOfMeeting) === activeDay;

    return (
      matchesCategory &&
      matchesDayFilter &&
      matchesQuery(club, deferredQuery.trim())
    );
  });

  const visibleCategories = categories
    .filter((category) => {
      if (activeCategory === "all") {
        return true;
      }

      return slugifyCategory(category) === activeCategory;
    })
    .map((category) => ({
      name: category,
      slug: slugifyCategory(category),
      clubs: filteredClubs.filter((club) => club.categories.includes(category)),
    }))
    .filter((section) => section.clubs.length > 0);

  const handleReset = () => {
    setQuery("");
    setActiveCategory("all");
    setActiveDay("All Days");
  };

  return (
    <main>
      <div className="hero">
        <div className="hero_shape"></div>
        <div className="hero_inner">
          <div className="hero_left">
            <div className="hero_title">
              <h1>Find your</h1>
              <h2>club</h2>
            </div>
            <div className="hero_subtitle">
              <h5>Explore every club, team, and organization at Dr. GW. Williams S.S.</h5>
              <h5>Find where you belong</h5>
            </div>
            <div className="search_container">
              <i className="fas fa-search"></i>
              <ClubSearchInput value={query} onChange={setQuery} />
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className="stat-num">{clubs.length}</span>
                <span className="stat-label">Total Clubs</span>
              </div>
              <div className={styles.heroStat}>
                <span className="stat-num">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-wrapper">
        <ResponsiveFilterPanel>
          <ClubsFilterControls
            categories={categoryFilters}
            activeCategory={activeCategory}
            activeDay={activeDay}
            onCategoryChange={setActiveCategory}
            onDayChange={setActiveDay}
          />
          <span className={`results-count ${styles.resultsCount}`}>
            Showing {filteredClubs.length} club{filteredClubs.length === 1 ? "" : "s"}
          </span>
        </ResponsiveFilterPanel>

        <div className={styles.mobileResultsBar}>
          <span className={`results-count results-count-mobile ${styles.resultsCount} ${styles.resultsCountMobile}`}>
            Showing {filteredClubs.length} club{filteredClubs.length === 1 ? "" : "s"}
          </span>
        </div>

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
              <ResetFiltersButton onReset={handleReset} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.ctaBanner}>
        <h2>Don&apos;t See Your Club? <span>Start One.</span></h2>
        <p>Any GW Williams student can start a new club. Talk to a teacher that is interested with your idea.</p>
      </div>
    </main>
  );
}
