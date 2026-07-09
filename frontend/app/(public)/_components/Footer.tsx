"use client";
import { useCopyToClipboard } from "@/app/(public)/_utils/useCopyToClipboard";
import { getSchoolYear } from "@/app/(public)/_utils/getYear";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//ICONS
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const [copyStatus, copiedText, copyToClipboard] = useCopyToClipboard();
  const [schoolYear, setSchoolYear] = useState<string | null>(null);

    useEffect(() => {
        setSchoolYear(getSchoolYear());
    }, []);

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>School Info</h4> {/*Change to school info pulled from backend API */}
          <span className="no-pointer"><p>Aurora, Ontario, Canada</p></span>
          <p>
            <FontAwesomeIcon icon={faLocationDot} className="fas" />
            <a href="https://maps.app.goo.gl/4MHrcdbASUjSuxsi7">
              11 Spring Farm Road, L4G 7W2
            </a>
          </p>
          <FontAwesomeIcon icon={faPhone} className="fas" />
          <button onClick={() => handleCopy("(905) 727-3131")}>
            {copyStatus === 'success' ? `Copied: ${copiedText}` : '(905) 727-3131'}          
            {copyStatus === 'error' && <p>Failed to copy.</p>}
          </button>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <p>Stay connected with Williams STUCO</p>
          <div className="social-row">
            <a
              href="https://www.instagram.com/drgwwilliams"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Instagram"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://drgwwilliams-ss.yrdsb.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="School website"
              aria-label="School website"
            >
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Dr. G.W. Williams S.S. Student Council {schoolYear ?? ''}</span>
        <span>&copy; {schoolYear ?? ''} Williams STUCO. All rights reserved.</span>
      </div>
    </footer>
  );
}