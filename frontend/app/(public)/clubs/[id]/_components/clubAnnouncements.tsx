"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { ClubAnnouncement } from "@/app/_lib/club";
import styles from "./clubAnnouncements.module.css";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "long",
});

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

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
  // Format only after hydration, using the visitor's locale and timezone.
  const isClient = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
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
  const headingText = view === "pinned" ? "Club notice" : "Announcements";

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
          <h2 id={headingId}>{headingText}</h2>
          <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close announcements" autoFocus>
            Close
          </button>
        </header>
        <div className={styles.list}>
          {visible.map((item, index) => {
            const posted = timestamp(item.datePosted);
            const expired = timestamp(item.expiry) <= currentTime;
            const announcementClassName = expired
              ? `${styles.item} ${styles.expired}`
              : styles.item;
            return (
              <article className={announcementClassName} key={`${item.datePosted}-${index}`}>
                <h3>{item.title}</h3>
                <div className={styles.meta}>
                  {Number.isFinite(posted) && (
                    <time dateTime={new Date(posted).toISOString()}>{isClient ? dateFormatter.format(posted) : null}</time>
                  )}
                  {expired ? <span>Expired</span> : item.popup && timestamp(item.expiry) > currentTime ? <span>Pinned</span> : null}
                </div>
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
