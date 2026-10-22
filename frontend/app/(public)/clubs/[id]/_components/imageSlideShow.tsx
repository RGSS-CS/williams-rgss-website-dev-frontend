"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/app/_lib/gallery-photos";
import styles from "@/app/(public)/clubs/[id]/club-detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

type ClubSlideShowProps = {
  photos: GalleryPhoto[];
};

export default function ClubSlideshow({ photos }: ClubSlideShowProps) {
  const [current, setCurrent] = useState(0);
  const dotsRef = useRef<HTMLDivElement>(null);
  const activeIndex = photos.length === 0 ? 0 : current % photos.length;

  useEffect(() => {
    const dots = dotsRef.current;
    const activeDot = dots?.children.item(activeIndex) as HTMLElement | null;

    if (!dots || !activeDot) {
      return;
    }

    const dotsBounds = dots.getBoundingClientRect();
    const activeDotBounds = activeDot.getBoundingClientRect();
    const activeDotCenter = activeDotBounds.left + activeDotBounds.width / 2;
    const dotsCenter = dotsBounds.left + dots.clientWidth / 2;

    dots.scrollTo({
      left: dots.scrollLeft + activeDotCenter - dotsCenter,
      behavior: "smooth",
    });
  }, [activeIndex]);

  if (photos.length === 0) {
    return (
      <div className={styles.imgContainer}>
        <div className={`${styles.imgContainerMain} ${styles.imgPlaceholder}`}>
          No media provided
        </div>
      </div>
    );
  }

  const photo = photos[activeIndex];

  const previous = () => {
    setCurrent((current) => ((current % photos.length) + photos.length - 1) % photos.length);
  };

  const next = () => {
    setCurrent((current) => (current + 1) % photos.length);
  };

  return (
    <div className={styles.imgContainer}>
      <div className={styles.imgContainerMain}>
        {photos.map((p, index) => (
          <img
            key={`${p.club}-${p.image}-${p.createdDate}`}
            src={p.image}
            alt={p.description || p.name}
            className={styles.img}
            style={{
              opacity: index === activeIndex ? 1 : 0,
              pointerEvents: index === activeIndex ? "auto" : "none",
            }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}

        {photos.length > 1 && (
          <>
            <button
              onClick={previous}
              aria-label='Previous Image'
              className={`${styles.arrow} ${styles.arrowLeft}`}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>

            <button
              onClick={next}
              aria-label='Next Image'
              className={`${styles.arrow} ${styles.arrowRight}`}
            >
              <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </>
        )}

        <div className={styles.counter}>
          {activeIndex + 1} / {photos.length}
        </div>
      </div>

      {photos.length > 1 && (
        <div className={styles.dots} ref={dotsRef}>
          {photos.map((photo, index) => (
            <button
              key={`${photo.club}-${photo.image}-${photo.createdDate}`}
              type='button'
              className={`${styles.dot} ${index === activeIndex ? styles.dots_active : ""}`}
              onClick={() => setCurrent(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
      )}

      {photo.description && <p className={styles.caption}>{photo.description}</p>}
    </div>
  );
}
