"use client";

import { useState } from "react";
import styles from "@/app/(public)/(global_pages)/clubs/[id]/club-detail.module.css";

interface FloatingApplyPanelProps {
  meetingDay: string;
  meetingTime: string;
  roomLabel: string;
  classcode: string;
}

export default function FloatingApplyPanel({
  meetingDay,
  meetingTime,
  roomLabel,
  classcode,
}: FloatingApplyPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.floatingApplyTab}>
      {/* Panel - width controlled via inline style to avoid CSS Modules hashing issues */}
      <div
        className={styles.applyPanel}
        style={{ width: isOpen ? "280px" : "0" }}
      >
        <div className={styles.applyPanelInner}>
          <div className={styles.applyPanelHeader}>
            <h4>Join the Club</h4>
            <button
              className={styles.applyPanelClose}
              onClick={() => setIsOpen(false)}
              title="Close"
              type="button"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className={styles.applyInfoRow}>
            <i className="fas fa-calendar-alt"></i>
            <p>Meetings: {meetingDay} at {meetingTime}</p>
          </div>
          <div className={styles.applyInfoRow}>
            <i className="fas fa-door-open"></i>
            <p>Location: {roomLabel}</p>
          </div>
          <div className={styles.applyInfoRow}>
            <i className="fas fa-envelope"></i>
            <p>
              <strong>Google Classroom Code:</strong>{" "}
              <span className={styles.applyCodeBadge}>{classcode}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        className={styles.applyTabBtn}
        onClick={() => setIsOpen(true)}
        type="button"
        title="Apply for Club"
      >
        Apply Now
      </button>
    </div>
  );
}