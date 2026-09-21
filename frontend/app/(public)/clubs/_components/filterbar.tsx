"use client";

import { JSX } from "react";
import FilterDropdown from "@/app/(public)/_components/filterDropdown";
import styles from "@/app/(public)/_styles/sections/filters.module.css";

export type CategoryFilter = {
  value: string;
  label: string;
  icon?: JSX.Element;
  iconClass?: string;
};

const dayFilters = ["All Days", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

type ClubsFilterControlsProps = {
  count: number;
  categories: CategoryFilter[];
  activeCategory: string;
  activeDay: string;
  onCategoryChange: (category: string) => void;
  onDayChange: (day: string) => void;
};

export default function ClubsFilterControls({
  count,
  categories,
  activeCategory,
  activeDay,
  onCategoryChange,
  onDayChange,
}: ClubsFilterControlsProps) {
  return (
    <FilterDropdown count={count}>
      {categories.map((filter) => (
        <button
          key={filter.value}
          className={styles.filterChip}
          data-active={activeCategory === filter.value}
          data-variant={filter.value === "all" ? "primary" : "gold"}
          onClick={() => onCategoryChange(filter.value)}
        >
          {filter.icon ?? (filter.iconClass ? <i className={filter.iconClass}></i> : null)}
          {filter.label}
        </button>
      ))}
      <div className={styles.dayFilterRow}>
        {dayFilters.map((day) => (
          <button
            key={day}
            className={styles.filterChip}
            data-active={activeDay === day}
            data-variant='primary'
            onClick={() => onDayChange(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </FilterDropdown>
  );
}
