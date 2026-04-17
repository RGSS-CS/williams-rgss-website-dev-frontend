// These styles apply to every route in the application
import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dr. GW Williams Secondary School STUCO',
  description: 'STUCO Cloud Portal for Dr. GW Williams Secondary School',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN Link */}
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        {/* Google Fonts CDN Link */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="navbar">
          <div className="header-container">
            <div className="title-container">
              <div className="logo">
                <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
              </div>
              <div className="title-title">
                <span id="school-title"><h1>Dr. GW Williams S.S.</h1></span>
                <span id="school-subtitle">Student Council</span>
              </div>

            </div>

            <div className="nav-links">
              <a href="/public">Home</a>
              <a href="/public/clubs">Clubs</a>
              <a href="/public/gallery">Gallery</a>
              <a href="/public/about">About</a>
            </div>
          </div>
        </div>
        {children}
        <div className="footer">
          <div className="footer-container">
            <p>&copy; {currentYear} Dr. GW Williams Secondary School Student Council. All rights reserved.</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/drgwwilliams/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://drgwwilliams-ss.yrdsb.ca/" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe"></i>
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}