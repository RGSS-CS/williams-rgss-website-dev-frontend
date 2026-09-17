"use client";

import { useId, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/(public)/_styles/sections/filters.module.css";

export default function FilterDropdown({ children, count }: { children: ReactNode; count?: number }) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <div className={styles.filterDropdown} data-open={open}>
            <button
                type="button"
                className={styles.filterLabel}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((current) => !current)}
            >
                <FontAwesomeIcon icon={faFilter} />
                Filter
                <FontAwesomeIcon icon={faChevronDown} className={styles.filterChevron} />
                {count !== undefined && (
                    <span className={styles.filterResultsCount}>
                        Showing {count} club{count === 1 ? "" : "s"}
                    </span>
                )}
            </button>
            <div id={panelId} className={styles.filterPanel} inert={!open}>
                <div className={styles.filterPanelInner}>
                    <div className={styles.filterOptions}>{children}</div>
                </div>
            </div>
        </div>
    );
}
