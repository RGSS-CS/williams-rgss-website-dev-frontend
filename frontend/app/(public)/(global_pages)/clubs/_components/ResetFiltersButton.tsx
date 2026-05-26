"use client";
import styles from "@/app/(public)/(global_pages)/clubs/clubs.module.css";

type ResetFiltersButtonProps = {
  onReset: () => void;
};

export default function ResetFiltersButton({ onReset }: ResetFiltersButtonProps) {
  return (
    <button className={styles.ctaBtn} onClick={onReset}>
      <i className="fas fa-undo"></i>Reset Filters
    </button>
  );
}
