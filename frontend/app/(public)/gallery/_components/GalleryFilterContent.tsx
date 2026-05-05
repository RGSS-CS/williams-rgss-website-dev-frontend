const categorySections = [
  { key: "academic", iconClass: "fas fa-book", label: "Academic" },
  { key: "arts", iconClass: "fas fa-palette", label: "Arts" },
  { key: "community", iconClass: "fas fa-hands-helping", label: "Community" },
  { key: "sports", iconClass: "fas fa-running", label: "Sports & Recreation" },
  { key: "events", iconClass: "fas fa-calendar-check", label: "Events" },
] as const;

export default function GalleryFilterContent() {
  return (
    <>
      <span className="filter_label">
        <i className="fas fa-filter"></i>
        Filter
      </span>
      {categorySections.map((section) => (
        <button key={section.key} className="filter-chip" type="button">
          <i className={section.iconClass}></i>
          {section.label}
        </button>
      ))}
    </>
  );
}
