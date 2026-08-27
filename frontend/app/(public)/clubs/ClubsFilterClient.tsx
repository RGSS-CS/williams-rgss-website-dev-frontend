"use client";

import { JSX, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { Club } from "@/app/_lib/club";

import styles from "@/app/(public)/clubs/clubs.module.css";
import catStyles from "@/app/(public)/_styles/sections/categories.module.css";

import MobileFilterPanel from "@/app/(public)/_components/mobileFilterPanel";
import ClubSearchInput from "./_components/searchInput";
import ClubsFilterControls, { type CategoryFilter } from "./_components/filterbar";
import ResetFiltersButton from "./_components/resetFilterButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faBook,
  faPalette,
  faHandsHelping,
  faRunning,
  faFlask,
  faMicrochip,
  faMusic,
  faBriefcase,
  faSearch,
  faArrowRight,
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

type ClubsFilterClientProps = {
  clubs: Club[];
  searchOnly?: boolean;
};

const DEFAULT_CATEGORY_ICON = <FontAwesomeIcon icon={faLayerGroup} />;

const CATEGORY_ICON_MAP: Record<string, JSX.Element> = {
  academic: <FontAwesomeIcon icon={faBook} />,
  arts: <FontAwesomeIcon icon={faPalette} />,
  community: <FontAwesomeIcon icon={faHandsHelping} />,
  sports: <FontAwesomeIcon icon={faRunning} />,
  recreation: <FontAwesomeIcon icon={faRunning} />,
  stem: <FontAwesomeIcon icon={faFlask} />,
  science: <FontAwesomeIcon icon={faFlask} />,
  technology: <FontAwesomeIcon icon={faMicrochip} />,
  music: <FontAwesomeIcon icon={faMusic} />,
  business: <FontAwesomeIcon icon={faBriefcase} />,
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

  return normalized ? (map[normalized] ?? "All Days") : "All Days";
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
    <a href={`/clubs/${club.id}`} className={styles.clubCardLink}>
      <article className={styles.club_card}>
        <div className={styles.club_card_name}>
          <h3>{club.name}</h3>
        </div>

        <div className={styles.club_card_meta}>
          <div className={styles.club_meta_row}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />

            <h4>
              <b>Room:</b> {club.roomNumber}
            </h4>
          </div>

          <div className={styles.club_meta_row}>
            <FontAwesomeIcon icon={faCalendarAlt} />

            <h4>
              <b>{club.repetition}:</b> {club.dayOfMeeting} @ {club.time}
            </h4>
          </div>
        </div>

        <p className={styles.club_card_description}>{club.preview_description}</p>

        <div className={styles.club_card_divider}></div>

        <div className={styles.club_card_footer}>
          <span className={styles.open_club_btn}>
            View Details
            <FontAwesomeIcon icon={faArrowRight} />
            <span className={styles.club_tag}>
              <h6>{club.acceptingApplicants}</h6>
            </span>
          </span>
        </div>
      </article>
    </a>
  );
}

export default function ClubsFilterClient({ clubs, searchOnly = false }: ClubsFilterClientProps) {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDay, setActiveDay] = useState("All Days");

  useEffect(() => {
    setQuery(searchParams.get("q")?.trim() ?? "");

    setActiveCategory(searchParams.get("category") ?? "all");

    setActiveDay(searchParams.get("day") ?? "All Days");
  }, [searchParams]);

  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(
    () =>
      Array.from(new Set(clubs.flatMap((club) => club.categories).filter(Boolean))).sort(
        (left, right) => left.localeCompare(right)
      ),
    [clubs]
  );

  const categoryFilters: CategoryFilter[] = useMemo(
    () => [
      {
        value: "all",
        label: "All Clubs",
      },

      ...categories.map((category) => ({
        value: slugifyCategory(category),
        label: category,
        icon: getCategoryIcon(category),
      })),
    ],
    [categories]
  );

  const updateSearch = (partial: {
    q?: string | null;
    category?: string | null;
    day?: string | null;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (partial.q !== undefined) {
      if (partial.q) {
        params.set("q", partial.q);
      } else {
        params.delete("q");
      }
    }

    if (partial.category !== undefined) {
      if (partial.category && partial.category !== "all") {
        params.set("category", partial.category);
      } else {
        params.delete("category");
      }
    }

    if (partial.day !== undefined) {
      if (partial.day && partial.day !== "All Days") {
        params.set("day", partial.day);
      } else {
        params.delete("day");
      }
    }

    const queryString = params.toString();

    const url = queryString ? `/clubs?${queryString}` : "/clubs";

    window.history.replaceState(null, "", url);

    if (partial.q !== undefined) {
      setQuery(partial.q ?? "");
    }

    if (partial.category !== undefined) {
      setActiveCategory(partial.category ?? "all");
    }

    if (partial.day !== undefined) {
      setActiveDay(partial.day ?? "All Days");
    }
  };

  /*
   * This instance is only used for the search box
   * inside the server-rendered hero.
   */
  if (searchOnly) {
    return <ClubSearchInput value={query} onChange={(value) => updateSearch({ q: value })} />;
  }

  const filteredClubs = useMemo(
    () =>
      clubs.filter((club) => {
        const clubCategorySlugs = club.categories.map(slugifyCategory);

        const matchesCategory =
          activeCategory === "all" || clubCategorySlugs.includes(activeCategory);

        const matchesDayFilter =
          activeDay === "All Days" || formatDayChip(club.dayOfMeeting) === activeDay;

        return matchesCategory && matchesDayFilter && matchesQuery(club, deferredQuery.trim());
      }),
    [clubs, activeCategory, activeDay, deferredQuery]
  );

  const visibleCategories = useMemo(
    () =>
      categories
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
        .filter((section) => section.clubs.length > 0),
    [categories, activeCategory, filteredClubs]
  );

  const handleReset = () => {
    updateSearch({
      q: "",
      category: "all",
      day: "All Days",
    });
  };

  return (
    <div className='sticky-wrapper'>
      <MobileFilterPanel>
        <ClubsFilterControls
          categories={categoryFilters}
          activeCategory={activeCategory}
          activeDay={activeDay}
          onCategoryChange={(category) =>
            updateSearch({
              category,
            })
          }
          onDayChange={(day) =>
            updateSearch({
              day,
            })
          }
        />

        <span className={`results-count ${styles.resultsCount}`}>
          Showing {filteredClubs.length} club
          {filteredClubs.length === 1 ? "" : "s"}
        </span>
      </MobileFilterPanel>

      <div className={styles.mobileResultsBar}>
        <span
          className={`results-count results-count-mobile ${styles.resultsCount} ${styles.resultsCountMobile}`}
        >
          Showing {filteredClubs.length} club
          {filteredClubs.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className={catStyles.category_container}>
        {visibleCategories.map((section) => (
          <div
            className={catStyles.category_section}
            data-category={section.slug}
            id={`cat-${section.slug}`}
            key={section.slug}
          >
            <div className={catStyles.category_header}>
              <div className={catStyles.category_accent}></div>

              <span className={catStyles.category_title}>
                <span className={catStyles.category_icon}>{getCategoryIcon(section.name)}</span>

                {section.name}
              </span>

              <div className={catStyles.category_divider}></div>

              <span className={catStyles.category_count}>
                {section.clubs.length} club
                {section.clubs.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className={`${catStyles.cards_grid} ${styles.clubCardsGrid}`}>
              {section.clubs.map((club) => (
                <ClubCard club={club} key={`${section.slug}-${club.id}`} />
              ))}
            </div>
          </div>
        ))}

        {visibleCategories.length === 0 && (
          <div className={styles.emptyState}>
            <FontAwesomeIcon icon={faSearch} size='3x' />

            <h3>No Clubs Found</h3>

            <p>Try a different search term or clear your filters</p>

            <ResetFiltersButton onReset={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
}
