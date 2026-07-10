"use client";
import { useCopyToClipboard } from "@/app/(public)/_utils/useCopyToClipboard";
import { getSchoolYear } from "@/app/(public)/_utils/getYear";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Management } from "@/app/_lib/management";
import styles from "./footer.module.css"
//ICONS
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

type ManagementProps = {
  management: Management;
};

export default function Footer({ management }: ManagementProps) {

  const [copyStatus, copiedText, copyToClipboard] = useCopyToClipboard();
  const [schoolYear, setSchoolYear] = useState<string | null>(null);

  const address = management.schoolLocation?.[0]?.location;
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

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
  };

  return (
    <footer className={styles.site_footer}>
      <div className={styles.footer_inner}>
        <div className={styles.footer_col}>
          <h4>School Info</h4>
          <span className={styles.no_pointer}><p>{regionLine}</p></span>
          <p>
            <FontAwesomeIcon icon={faLocationDot} className={styles.fas} />
            {mapsUrl ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                {displayAddress}
              </a>
            ) : (
              <span>Address unavailable</span>
            )}
          </p>
          <FontAwesomeIcon icon={faPhone} className={styles.fas} />
          <button onClick={() => handleCopy("(905) 727-3131")}>
            {copyStatus === 'success' ? `Copied: ${copiedText}` : '(905) 727-3131'}
            {copyStatus === 'error' && <p>Failed to copy.</p>}
          </button>
        </div>
        <div className={styles.footer_col}>
          <h4>Follow Us</h4>
          <p>Stay connected with {management.councilName || 'student council'}</p>
          <div className={styles.social_row}>
            <a href="https://www.instagram.com/drgwwilliams" target="_blank" rel="noopener noreferrer" className={styles.social_link} title="Instagram" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://drgwwilliams-ss.yrdsb.ca/" target="_blank" rel="noopener noreferrer" className={styles.social_link} title="School website" aria-label="School website">
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <span>{management.schoolName} {management.councilName} {schoolYear ?? ''}</span>
        <span>&copy; {schoolYear ?? ''} {management.schoolName} {management.councilName}. All rights reserved.</span>
      </div>
    </footer>
  );
}