"use client";
import styles from "@/app/(public)/clubs/clubs.module.css";


export default function EmptyState() {
    const handleReset = () => {};
    const hidden = document.querySelector("#emptyState");

    return (
        <div className={styles.emptyState} id="emptyState">
            <i className="fas fa-search"></i>
            <h3>No Clubs Found</h3>
            <p>Try a different search term or clear your filters</p>
            <button className="cta-btn" onClick={handleReset}>
                <i className="fas fa-undo"></i>Reset Filters
            </button>
        </div>
    );
}
