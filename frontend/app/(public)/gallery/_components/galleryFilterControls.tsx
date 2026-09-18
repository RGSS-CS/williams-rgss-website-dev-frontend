import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterDropdown from "@/app/(public)/_components/filterDropdown";
import styles from "@/app/(public)/_styles/sections/filters.module.css";
//ICONS
import { faBook, faPalette, faHandsHelping, faRunning, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const categorySections = [
    { key: "academic", icon: <FontAwesomeIcon icon={faBook} />, label: "Academic" },
    { key: "arts", icon: <FontAwesomeIcon icon={faPalette} />, label: "Arts" },
    { key: "community", icon: <FontAwesomeIcon icon={faHandsHelping} />, label: "Community" },
    { key: "sports", icon: <FontAwesomeIcon icon={faRunning} />, label: "Sports & Recreation" },
    { key: "events", icon: <FontAwesomeIcon icon={faCalendarCheck} />, label: "Events" },
] as const;

export default function GalleryFilterContent() {
    return (
        <FilterDropdown>
            {categorySections.map((section) => (
                <button key={section.key} className={styles.filterChip} type="button">
                    {section.icon}
                    {section.label}
                </button>
            ))}
        </FilterDropdown>
    );
}
