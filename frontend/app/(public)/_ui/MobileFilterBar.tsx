"use client";

import { useState, useEffect } from "react";

export default function FilterBar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Mobile toggle button — hidden on desktop */}
      <div className="filter_bar_container">
        <button
          className="filter-toggle-btn"
          onClick={() => setOpen(true)}
          aria-label="Open filters"
        >
          <i className="fas fa-filter"></i>
          Filters
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div className="filter-sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar drawer */}
      <div className={`filter-sidebar ${open ? "open" : ""}`}>
        <div className="filter-sidebar-header">
          <span className="filter-sidebar-title">
            <i className="fas fa-filter"></i>
            Filters
          </span>
          <button
            className="filter-sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="filter-sidebar-body">
          {children}
        </div>
      </div>

      <div className="filter_bar_container filter_bar_container--desktop">
        <div className="filter_bar">
          {children}
        </div>
      </div>
    </>
  );
}