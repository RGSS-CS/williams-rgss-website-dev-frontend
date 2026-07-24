"use client";

import styles from "@/app/private/(authenticated)/_styles/base/footer.module.css";
import type { Management } from "@/app/_lib/management";
import { useState, useEffect } from "react";
import { getSchoolYear } from "@/app/_utils/getYear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SchoolLocation from "@/app/_utils/formatLocation";

//ICONS
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

type FooterProps = {
    management: Management | null;
}

export default function ExecFooter({ management }: FooterProps) {
    const [schoolYear, setSchoolYear] = useState<string | null>(null);
    const [mapsUrl, displayAddress, regionLine] = SchoolLocation({management});

    useEffect(() => {
        setSchoolYear(getSchoolYear());
    }, []);

    return (
        <div className={styles.container}>
            <b>{management?.schoolName}</b>
            <span>{regionLine}</span>
            <div className={styles.location}>
                {mapsUrl ? (
                    <>
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.desktop_only}
                        >
                            {displayAddress}
                        </a>
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.mobile_only}
                        >
                            Open In Google Maps
                        </a>
                    </>
                ) : (
                    <a>Address unavailable</a>
                )}
            </div>
            <div className={styles.phone}>
                <FontAwesomeIcon icon={faPhone} />
                <p>{management?.schoolPhone}</p>
            </div>
            <div className={styles.email}>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{management?.schoolEmail}</p>
            </div>
        </div>
    );
}