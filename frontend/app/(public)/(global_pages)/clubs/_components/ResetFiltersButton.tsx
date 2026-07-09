"use client";
import styles from "@/app/(public)/(global_pages)/clubs/clubs.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//ICONS
import { faUndo } from '@fortawesome/free-solid-svg-icons'

type ResetFiltersButtonProps = {
  onReset: () => void;
};

export default function ResetFiltersButton({ onReset }: ResetFiltersButtonProps) {
  return (
    <button className={styles.ctaBtn} onClick={onReset}>
      <FontAwesomeIcon icon={faUndo} />Reset Filters
    </button>
  );
}
