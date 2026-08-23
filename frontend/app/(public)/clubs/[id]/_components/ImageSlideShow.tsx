"use client";

import Image from "next/image";
import { useState } from "react";
import type { Gallery } from "@/app/_lib/club";
import styles from "@/app/(public)/clubs/[id]/club-detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Icons
import { faArrowRightLong, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

type ClubSlideShowProps = {
    gallery: Gallery;
};

export default function ClubSlideshow({
    gallery,
}: ClubSlideShowProps) {
    const photos = gallery.photos;
    const [current, setCurrent] = useState(0);

    if (photos.length === 0) {
        return null;
    }

    const photo = photos[current];

    const previous = () => {
        setCurrent((current) =>
            current === 0 ? photos.length - 1 : current - 1
        );
    };

    const next = () => {
        setCurrent((current) =>
            current === photos.length - 1 ? 0 : current + 1
        );
    };

    return (
        <div className={styles.IMG_Container}>
            <div className={styles.IMG_Container_Main}>
            <Image
                key={photo.id}
                src={photo.image}
                alt={photo.caption || photo.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className={styles.IMG}
                priority={current === 0}
            />

            {photos.length > 1 && (
                <>
                    <button onClick={previous} aria-label="Previous Image" className={`${styles.arrow} ${styles.arrowLeft}`}>
                        <FontAwesomeIcon icon={faArrowLeftLong}  />
                    </button>

                    <button onClick={next} aria-label="Next Image"className={`${styles.arrow} ${styles.arrowRight}`}>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </button>
                </>
            )}

            <div className={styles.counter}>
                {current + 1} / {photos.length}
            </div>
            </div>

            {photos.length > 1 && (
                <div className={styles.dots}>
                    {photos.map((photo, index) => (
                        <button
                            key={photo.id}
                            type="button"
                            className={`${styles.dot}${index === current
                                    ? `${styles.dots_active}`
                                    : ""
                                }`}
                            onClick={() => setCurrent(index)}
                            aria-label={`Show image ${index + 1}`}
                            aria-current={index === current}
                        />
                    ))}
                </div>
            )}

            {photo.caption && (
                <p className={styles.caption}>
                    {photo.caption}
                </p>
            )}
        </div>
    )
};