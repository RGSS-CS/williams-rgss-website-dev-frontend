"use client";

import { getSchoolYear } from "@/app/(public)/_utils/getYear";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Management } from "@/app/_lib/management"
import styles from "./footer.module.css";
//ICONS
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

type FooterProps = {
  management: Management;
};

export default function MobileFooter({ management }: FooterProps) {
  const [schoolYear, setSchoolYear] = useState<string | null>(null);

  const address = management.schoolLocation?.[0]?.location;
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null;
  const { regionLine } = address
    ? (() => {
      const parts = address.split(",").map(s => s.trim());
      const [, , , city, region, , province, , country] = parts;
      const regionLine = [city, region, province, country].filter(Boolean).join(", ");
      return { regionLine };
    })()
    : { regionLine: null };

  useEffect(() => {
    setSchoolYear(getSchoolYear());
  }, []);

  return (
    <footer className={styles.site_footer}>
      <div className={styles.footer_inner}>
        <div className={styles.footer_col}>
          <h4>School Info</h4> {/*Change to school info pulled from backend API */}
          <p>{regionLine}</p>
          <div className={styles.link}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.fas} />
            {mapsUrl ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Open In Google Maps
              </a>
            ) : (
              <a>Address unavailable</a>
            )}
          </div>
          <div className={styles.link}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
            <a href={`mailto:${management.schoolEmail}`} target="_blank" rel="noopener noreferrer">{management.schoolEmail}</a>
          </div>
          <div className={styles.link}>
            <FontAwesomeIcon icon={faPhone} className={styles.fas} />
            <a href="tel:(905) 727-3131">(905) 727-3131</a>
          </div>
        </div>
        <div className={styles.footer_col}>
          <h4>Follow Us</h4>
          <p>Stay connected with Williams STUCO</p>
          <div className={styles.social_row}>
            <a
              href="https://www.instagram.com/drgwwilliams"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social_link}
              title="Instagram"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://drgwwilliams-ss.yrdsb.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social_link}
              title="School website"
              aria-label="School website"
            >
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <span>{management.schoolName} {schoolYear ?? ''}</span>
        <span>&copy; {schoolYear ?? ''} Williams STUCO. All rights reserved.</span>
      </div>
    </footer>
  );
}
