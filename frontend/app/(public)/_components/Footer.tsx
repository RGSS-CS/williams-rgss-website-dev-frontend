"use client";
import { useCopyToClipboard } from "@/app/(public)/_utils/useCopyToClipboard";

export default function Footer() {
  const [copyStatus, copiedText, copyToClipboard] = useCopyToClipboard();

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>School Info</h4> {/*Change to school info pulled from backend API */}
          <span className="no-pointer"><p>Aurora, Ontario, Canada</p></span>
          <p>
            <a href="https://maps.app.goo.gl/4MHrcdbASUjSuxsi7">
              <i className="fas fa-map-marker-alt"></i>
              11 Spring Farm Road, L4G 7W2
            </a>
          </p>
          <button onClick={() => handleCopy("(905) 727-3131")}> <i className="fas fa-copy"></i>
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
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://drgwwilliams-ss.yrdsb.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="School website"
              aria-label="School website"
            >
              <i className="fa fa-globe"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Dr. G.W. Williams S.S. Student Council {currentYear}</span>
        <span>&copy; {currentYear} Williams STUCO. All rights reserved.</span>
      </div>
    </footer>
  );
}
