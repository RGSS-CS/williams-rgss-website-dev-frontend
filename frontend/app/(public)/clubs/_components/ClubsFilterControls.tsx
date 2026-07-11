"use client";
import { JSX } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "@/app/(public)/_styles/sections/filters.module.css";
//ICONS
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export type CategoryFilter = {
  value: string;
  label: string;
  icon?: JSX.Element;
  iconClass?: string;
};

const dayFilters = ["All Days", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

type ClubsFilterControlsProps = {
  categories: CategoryFilter[];
  activeCategory: string;
  activeDay: string;
  onCategoryChange: (category: string) => void;
  onDayChange: (day: string) => void;
};

export default function ClubsFilterControls({
  categories,
  activeCategory,
  activeDay,
  onCategoryChange,
  onDayChange,
}: ClubsFilterControlsProps) {

  return (
    <>
      <span className={styles.filter_label}>
        <FontAwesomeIcon icon={faFilter} />
        Filter
      </span>
      {categories.map((filter) => (
        <button
          key={filter.value}
          className={`${styles.filter_chip}${activeCategory === filter.value ? ` ${styles.filter_chip_active_gold}` : ""}`}
          onClick={() => onCategoryChange(filter.value)}
        >
          {filter.icon ?? (filter.iconClass ? <i className={filter.iconClass}></i> : null)}
          {filter.label}
        </button>
      ))}
      <div className={styles.filter_divider}></div>
      {dayFilters.map((day) => (
        <button
          key={day}
          className={`${styles.filter_chip}${activeDay === day ? ` ${styles.filter_chip_active}` : ""}`}
          onClick={() => onDayChange(day)}
        >
          {day}
        </button>
      ))}
    </>
  );
}