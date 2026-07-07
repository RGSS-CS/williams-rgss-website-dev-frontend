"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      <div className="filter_bar_container">
        <button
          className="filter-toggle-btn"
          onClick={() => setOpen(true)}
          aria-label="Open filters"
        >
          <FontAwesomeIcon icon={faFilter} />
          Filters
        </button>
      </div>

      {open && <div className="filter-sidebar-overlay" onClick={() => setOpen(false)} />}

      <div className={`filter-sidebar ${open ? "open" : ""}`}>
        <div className="filter-sidebar-header">
          <span className="filter-sidebar-title">
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </span>
          <button
            className="filter-sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="filter-sidebar-body">{children}</div>
      </div>

      <div className="filter_bar_container filter_bar_container--desktop">
        <div className="filter_bar">{children}</div>
      </div>
    </>
  );
}
