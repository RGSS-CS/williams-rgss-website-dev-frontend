import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//ICONS
import { faBook, faPalette, faHandsHelping, faRunning, faCalendarCheck, faFilter } from "@fortawesome/free-solid-svg-icons";

const categorySections = [
  { key: "academic", icon: <FontAwesomeIcon icon={faBook} />, label: "Academic" },
  { key: "arts", icon: <FontAwesomeIcon icon={faPalette} />, label: "Arts" },
  { key: "community", icon: <FontAwesomeIcon icon={faHandsHelping} />, label: "Community" },
  { key: "sports", icon: <FontAwesomeIcon icon={faRunning} />, label: "Sports & Recreation" },
  { key: "events", icon: <FontAwesomeIcon icon={faCalendarCheck} />, label: "Events" },
] as const;

export default function GalleryFilterContent() {
  return (
    <>
      <span className="filter_label">
        <FontAwesomeIcon icon={faFilter} />
        Filter
      </span>
      {categorySections.map((section) => (
        <button key={section.key} className="filter-chip" type="button">
          {section.icon}
          {section.label}
        </button>
      ))}
    </>
  );
}
