"use client";

const categoryFilters = [
  { category: "all", label: "All Clubs", iconClass: undefined, active: true },
  { category: "academic", label: "Academic", iconClass: "fas fa-book", active: false },
  { category: "arts", label: "Arts", iconClass: "fas fa-palette", active: false },
  { category: "community", label: "Community", iconClass: "fas fa-hands-helping", active: false },
  { category: "sports", label: "Sports & Recreation", iconClass: "fas fa-running", active: false },
] as const;

const dayFilters = ["Mon", "Tue", "Wed", "Thur", "Fri"] as const;

export default function ClubsFilterControls() {
  const handleCategoryFilter = (category: string) => {
    void category;
  };

  const handleDayFilter = (day: string) => {
    void day;
  };

  return (
    <>
      <span className="filter_label">
        <i className="fas fa-filter"></i>
        Filter
      </span>
      {categoryFilters.map((filter) => (
        <button
          key={filter.category}
          className={`filter-chip${filter.active ? " active gold" : ""}`}
          onClick={() => handleCategoryFilter(filter.category)}
        >
          {filter.iconClass && <i className={filter.iconClass}></i>}
          {filter.label}
        </button>
      ))}
      <div className="filter_divider"></div>
      {dayFilters.map((day) => (
        <button
          key={day}
          className="filter-chip"
          onClick={() => handleDayFilter(day)}
        >
          {day}
        </button>
      ))}
    </>
  );
}
