// These styles apply to every route in the application
import './styles.css';
import type { Metadata } from 'next';
import Navbar from '@/app/(public)/_ui/navbar';

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
      <body>
        <Navbar />
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
                <a href="https://drgwwilliams-ss.yrdsb.ca/" target="_blank" rel="noopener noreferrer" className="social-link" title="YRDSB"><i className="fa fa-globe"></i></a>              
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Dr. G.W. Williams S.S. · Student Council {currentYear}</span>
            <span>© {currentYear} Williams STUCO · All rights reserved</span>
          </div>
        </footer>
      </body>
  )
}
