"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ClubAnnouncement } from "@/app/_lib/club";
import styles from "./clubAnnouncements.module.css";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "long",
  timeZone: "America/Toronto",
});

// Some API timestamps include seconds in their historical UTC offset.
function timestamp(value: string) {
  const match = value.match(/^(.*)([+-])(\d{2}):(\d{2}):(\d{2})$/);
  if (!match) return Date.parse(value);
  const [, date, sign, hours, minutes, seconds] = match;
  const offset = (+hours * 3600 + +minutes * 60 + +seconds) * 1000;
  return Date.parse(`${date}Z`) - (sign === "+" ? offset : -offset);
}

export default function ClubAnnouncements({ announcements, currentTime }: {
  announcements: ClubAnnouncement[];
  currentTime: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const [view, setView] = useState<"pinned" | "all">("pinned");
  const sorted = [...announcements].sort(
    (a, b) => (timestamp(b.datePosted) || 0) - (timestamp(a.datePosted) || 0)
  );
  const pinned = sorted.filter((item) => item.popup && timestamp(item.expiry) > currentTime);
  const hasPinned = pinned.length > 0;

  useEffect(() => {
    const modal = dialog.current;
    if (hasPinned) modal?.showModal();
    return () => modal?.close();
  }, [hasPinned]);

  if (announcements.length === 0) return null;
  const visible = view === "pinned" ? pinned : sorted;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        onClick={() => { setView("all"); dialog.current?.showModal(); }}
      >
        Announcements <span aria-hidden="true">({announcements.length})</span>
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={headingId}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom) {
            event.currentTarget.close();
          }
        }}
      >
        <header className={styles.header}>
          <div>
            <h2 id={headingId}>{view === "pinned" ? "Pinned announcements" : "Announcements"}</h2>
            <p>{view === "pinned" ? "The latest notices from this club." : "Club updates, including past announcements."}</p>
          </div>
          <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close announcements" autoFocus>
            &times;
          </button>
        </header>
        <div className={styles.list}>
          {visible.map((item, index) => {
            const posted = timestamp(item.datePosted);
            const expired = timestamp(item.expiry) <= currentTime;
            return (
              <article className={styles.item} key={`${item.datePosted}-${index}`}>
                <div className={styles.meta}>
                  {Number.isFinite(posted) && (
                    <time dateTime={new Date(posted).toISOString()}>{dateFormatter.format(posted)}</time>
                  )}
                  {expired ? <span>Expired</span> : item.popup && timestamp(item.expiry) > currentTime ? <span>Pinned</span> : null}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
        {view === "pinned" && (
          <footer className={styles.footer}>
            <button type="button" onClick={() => setView("all")}>View all announcements</button>
          </footer>
        )}
      </dialog>
    </>
  );
}
