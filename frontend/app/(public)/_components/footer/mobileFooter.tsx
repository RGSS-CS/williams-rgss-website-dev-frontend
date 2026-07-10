"use client";

import { getSchoolYear } from "@/app/(public)/_utils/getYear";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./footer.module.css";
//ICONS
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export default function MobileFooter() {
  const [schoolYear, setSchoolYear] = useState<string | null>(null);

    useEffect(() => {
        setSchoolYear(getSchoolYear());
    }, []);

  return (
    <footer className={styles.site_footer}>
      <div className={styles.footer_inner}>
        <div className={styles.footer_col}>
          <h4>School Info</h4> {/*Change to school info pulled from backend API */}
          <span className={styles.no_pointer}><p>Aurora, Ontario, Canada</p></span>
          <p>
            <a href="https://maps.app.goo.gl/4MHrcdbASUjSuxsi7">
              11 Spring Farm Road, L4G 7W2
            </a>
          </p>
          <p>
            <a href="tel:+19057273131">(905) 727-3131</a>
          </p>
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
        <span>Dr. G.W. Williams S.S. Student Council {schoolYear ?? ''}</span>
        <span>&copy; {schoolYear ?? ''} Williams STUCO. All rights reserved.</span>
      </div>
    </footer>
  );
}
