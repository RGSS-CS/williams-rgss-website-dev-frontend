"use client";

import { useState } from "react";
import type { GalleryPhoto } from "@/app/_lib/gallery-photos";
import styles from "@/app/(public)/clubs/[id]/club-detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

type ClubSlideShowProps = {
  photos: GalleryPhoto[];
};

export default function ClubSlideshow({ photos }: ClubSlideShowProps) {
  const [current, setCurrent] = useState(0);

  if (photos.length === 0) {
    return null;
  }

  const activeIndex = current % photos.length;
  const photo = photos[activeIndex];

  const previous = () => {
    setCurrent((current) => (current % photos.length + photos.length - 1) % photos.length);
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
        <div className={styles.dots}>
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
