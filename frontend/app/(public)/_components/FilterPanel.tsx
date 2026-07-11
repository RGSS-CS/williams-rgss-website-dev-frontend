"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import filterStyles from "@/app/(public)/_styles/sections/filters.module.css";
import sidebarStyles from "@/app/(public)/_styles/sections/filter-sidebar.module.css";
//ICONS
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

type ResponsiveFilterPanelProps = {
  children: React.ReactNode;
};

export default function ResponsiveFilterPanel({
  children,
}: ResponsiveFilterPanelProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className={filterStyles.filter_bar_container}>
        <button
          className={filterStyles.filter_toggle_btn}
          onClick={() => setOpen(true)}
          aria-label="Open filters"
        >
          <FontAwesomeIcon icon={faFilter} />
          Filters
        </button>
      </div>

      {open && <div className="filter_sidebar_overlay" onClick={() => setOpen(false)} />}

      <div className={`${sidebarStyles.filter_sidebar} ${open ? "open" : ""}`}>
        <div className={sidebarStyles.filter_sidebar_header}>
          <span className={sidebarStyles.filter_sidebar_title}>
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </span>
          <button
            className={sidebarStyles.filter_sidebar_close}
            onClick={() => setOpen(false)}
            aria-label="Close filters"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className={sidebarStyles.filter_sidebar_body}>{children}</div>
      </div>

      <div className={`${filterStyles.filter_bar_container} filter_bar_container_desktop`}>
        <div className={filterStyles.filter_bar}>{children}</div>
      </div>
    </>
  );
}
