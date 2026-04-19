// These styles apply to every route in the application
import './global.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import NavLinks from '@/components/NavLinks';

export const metadata: Metadata = {
  title: 'Dr. GW Williams STUCO',
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
            <NavLinks />
          </div>
        </div>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-col">
              <h4>School Info</h4>
              <p>Aurora · Ontario · Canada</p>
              <p><a href="https://maps.app.goo.gl/4MHrcdbASUjSuxsi7">11 Spring Farm Road · L4G 7W2</a></p>
              <p><a href="+19057273131">(905) 727-3131</a></p>
            </div>
            <div className="footer-col">
              <h4>Follow Us</h4>
              <p>Stay connected with Williams STUCO</p>
              <div className="social-row">
                <a href="https://www.instagram.com/drgwwilliams" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://drgwwilliams-ss.yrdsb.ca/" target="_blank" rel="noopener noreferrer" className="social-link" title="YRDSB"><i className="fas fa-globe"></i></a>              
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Dr. G.W. Williams S.S. · Student Council {currentYear}</span>
            <span>© {currentYear} Williams STUCO · All rights reserved</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
