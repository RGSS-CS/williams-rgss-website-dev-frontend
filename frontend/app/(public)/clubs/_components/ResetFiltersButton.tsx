"use client";

type ResetFiltersButtonProps = {
  onReset: () => void;
};

export default function ResetFiltersButton({ onReset }: ResetFiltersButtonProps) {
  return (
    <button className="cta-btn" onClick={onReset}>
      <i className="fas fa-undo"></i>Reset Filters
    </button>
  );
}
