"use client";
import Link from "next/link";
import { useCopyToClipboard } from "@/app/(public)/_utils/useCopyToClipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Management } from "@/app/_lib/site-management";
import styles from "./footer.module.css";
import SchoolLocation from "@/app/_utils/formatLocation";
//ICONS
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

type ManagementProps = {
  management: Management | null;
  schoolYear: string;
};

export default function Footer({ management, schoolYear }: ManagementProps) {
  const [copyStatus, copiedText, copyToClipboard] = useCopyToClipboard();
  const [mapsUrl, displayAddress, regionLine] = SchoolLocation({ management });

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
  };

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <div className={styles.footerCol}>
          <h4>School Info</h4>
          <p>{regionLine}</p>

          <div className={styles.link}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.fas} />
            {mapsUrl ? (
              <>
                <Link
                  href={mapsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`${styles.footerLink} ${styles.desktopOnly}`}
                >
                  {displayAddress}
                </Link>
                <Link
                  href={mapsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`${styles.footerLink} ${styles.mobileOnly}`}
                >
                  Open In Google Maps
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.link}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
            <Link
              href={`mailto:${management?.schoolEmail}`}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.footerLink}
            >
              {management?.schoolEmail}
            </Link>
          </div>

          <div className={styles.link}>
            <FontAwesomeIcon icon={faPhone} className={styles.fas} />
            <button
              type='button'
              className={styles.desktopOnly}
              onClick={() => handleCopy(management?.schoolPhone || "")}
            >
              {copyStatus === "success" ? `Copied: ${copiedText}` : management?.schoolPhone}
              {copyStatus === "error" && <p>Failed to copy.</p>}
            </button>
            <Link
              className={`${styles.footerLink} ${styles.mobileOnly}`}
              href={`tel:${management?.schoolPhone?.replace(/\D/g, "")}`}
            >
              {management?.schoolPhone}
            </Link>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4>Follow Us</h4>
          <Link
            href='https://www.instagram.com/drgwwilliams'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.footerLink}
            title='Instagram'
            aria-label='Instagram'
          >
            Instagram
          </Link>
          <Link
            href='https://drgwwilliams-ss.yrdsb.ca/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.footerLink}
            title='School website'
            aria-label='School website'
          >
            YRDSB
          </Link>
        </div>
        <div className={styles.footerCol}>
          <h4>More</h4>
          <Link
            href='https://github.com/RGSS-CS/williams-rgss-website-dev-frontend'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.footerLink}
          >
            Github
          </Link>
        </div>
        <div className={styles.footerCol}>
          <h4>Legal</h4>
          <Link href='' target='_blank' rel='noopener nofeferrer' className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href='' target='_blank' rel='noopener nofeferrer' className={styles.footerLink}>
            Terms of Service
          </Link>
          <Link
            href='https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-frontend/refs/heads/main/LICENSE'
            target='_blank'
            rel='noopener nofeferrer'
            className={styles.footerLink}
          >
            License
          </Link>
          <Link
            href='https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-frontend/refs/heads/main/OSS-LICENSES.md'
            target='_blank'
            rel='noopener nofeferrer'
            className={styles.footerLink}
          >
            OSS-License
          </Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>
          {management?.schoolName} {management?.councilName} {schoolYear ?? ""}
        </span>
        <span>
          &copy; {schoolYear ?? ""} {management?.schoolName} {management?.councilName}. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}
