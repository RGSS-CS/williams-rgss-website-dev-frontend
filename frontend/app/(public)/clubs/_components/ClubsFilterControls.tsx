"use client";

export type CategoryFilter = {
  value: string;
  label: string;
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
      <span className="filter_label">
        <i className="fas fa-filter"></i>
        Filter
      </span>
      {categories.map((filter) => (
        <button
          key={filter.value}
          className={`filter-chip${activeCategory === filter.value ? " active gold" : ""}`}
          onClick={() => onCategoryChange(filter.value)}
        >
          {filter.iconClass && <i className={filter.iconClass}></i>}
          {filter.label}
        </button>
      ))}
      <div className="filter_divider"></div>
      {dayFilters.map((day) => (
        <button
          key={day}
          className={`filter-chip${activeDay === day ? " active" : ""}`}
          onClick={() => onDayChange(day)}
        >
          {day}
        </button>
      ))}
    </>
  );
}
