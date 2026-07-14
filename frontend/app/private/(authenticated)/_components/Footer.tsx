"use client";

import styles from "@/app/private/(authenticated)/_styles/base/footer.module.css";
import type { Management } from "@/app/_lib/management";
import { useState, useEffect } from "react";
import { getSchoolYear } from "@/app/_utils/getYear";

type FooterProps = {
    management: Management | null;
}

export default function ExecFooter({ management }: FooterProps) {
    const [schoolYear, setSchoolYear] = useState<string | null>(null);

    const address = management?.schoolLocation?.[0]?.location;
    const mapsUrl = address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        : null;
    const { displayAddress, regionLine } = address
        ? (() => {
            const parts = address.split(",").map(s => s.trim());
            const [name, houseNumber, street, city, region, , province, , country] = parts;
            const displayAddress = [name, [houseNumber, street].filter(Boolean).join(" ")]
                .filter(Boolean)
                .join(", ");
            const regionLine = [city, region, province, country].filter(Boolean).join(", ");
            return { displayAddress, regionLine };
        })()
        : { displayAddress: null, regionLine: null };

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
                <i></i>
                {management?.schoolPhone}
            </div>
        </div>
    );
}