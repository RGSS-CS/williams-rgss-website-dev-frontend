"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filterStyles from "@/app/(public)/_styles/sections/filters.module.css";
import sidebarStyles from "@/app/(public)/_styles/sections/filter-sidebar.module.css";
//ICONS
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type MobileFilterPanelProps = {
    children: React.ReactNode;
};

export default function MobileFilterPanel(
    { children }: MobileFilterPanelProps
) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <div className={filterStyles.filterBarContainer}>
                <button
                    className={sidebarStyles.filterToggleBtn}
                    onClick={() => setOpen(true)}
                    aria-label="Open filters"
                >
                    <FontAwesomeIcon icon={faFilter} />
                    Filters
                </button>
            </div>

            {open && (
                <div
                    className={sidebarStyles.filterSidebarOverlay}
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={sidebarStyles.filterSidebar}
                data-open={open}
            >
                <div className={sidebarStyles.filterSidebarHeader}>
                    <span className={sidebarStyles.filterSidebarTitle}>
                        <FontAwesomeIcon icon={faFilter} />
                        Filters
                    </span>
                    <button
                        className={sidebarStyles.filterSidebarClose}
                        onClick={() => setOpen(false)}
                        aria-label="Close filters"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className={sidebarStyles.filterSidebarBody}>{children}</div>
            </div>

            <div
                className={filterStyles.filterBarContainer}
                data-variant="desktop"
            >
                <div className={filterStyles.filterBar}>{children}</div>
            </div>
        </>
    );
}
