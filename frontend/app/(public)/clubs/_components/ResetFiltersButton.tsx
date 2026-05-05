"use client";

export default function ResetFiltersButton() {
  const handleReset = () => {};

  return (
    <button className="cta-btn" onClick={handleReset}>
      <i className="fas fa-undo"></i>Reset Filters
    </button>
  );
}
