"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/not-found.module.css";

export default function NotFoundActions() {
    return (
        <div className={styles.actions}>
            <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => window.history.back()}>
                <FontAwesomeIcon icon={faArrowLeft} aria-hidden='true' />
                Back
            </button>
            <Link className={`${styles.btn} ${styles.btnBack}`} href='/'>
                <FontAwesomeIcon icon={faHouse} aria-hidden='true' />
                Home
            </Link>
        </div>
    );
}
