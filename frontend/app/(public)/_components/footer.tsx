"use client";
import { useCopyToClipboard } from "@/app/(public)/_utils/useCopyToClipboard";
import { getSchoolYear } from "@/app/_utils/getYear";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Management } from "@/app/_lib/site-management";
import styles from "@/app/(public)/_styles/base/footer.module.css";
import SchoolLocation from "@/app/_utils/formatLocation";
//ICONS
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

type ManagementProps = {
  management: Management | null;
};

export default function Footer({ management }: ManagementProps) {

  const [copyStatus, copiedText, copyToClipboard] = useCopyToClipboard();
  const [schoolYear, setSchoolYear] = useState<string | null>(null);
  const [mapsUrl, displayAddress, regionLine] = SchoolLocation({management});

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
          <p>{regionLine}</p>

          <div className={styles.link}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.fas} />
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

          <div className={styles.link}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
            <a href={`mailto:${management?.schoolEmail}`} target="_blank" rel="noopener noreferrer">{management?.schoolEmail}</a>
          </div>

          <div className={styles.link}>
            <FontAwesomeIcon icon={faPhone} className={styles.fas} />
            <a
              className={styles.desktop_only}
              onClick={() => handleCopy(management?.schoolPhone || '')}
            >
              {copyStatus === 'success' ? `Copied: ${copiedText}` : management?.schoolPhone}
              {copyStatus === 'error' && <p>Failed to copy.</p>}
            </a>
            <a className={styles.mobile_only} href={`tel:${management?.schoolPhone?.replace(/\D/g, '')}`}>
              {management?.schoolPhone}
            </a>
          </div>
        </div>

        <div className={styles.footer_col}>
          <h4>Follow Us</h4>
          <p>Stay connected with {management?.councilName || 'student council'}</p>
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
        <span>{management?.schoolName} {management?.councilName} {schoolYear ?? ''}</span>
        <span>&copy; {schoolYear ?? ''} {management?.schoolName} {management?.councilName}. All rights reserved.</span>
      </div>
    </footer>
  );
}