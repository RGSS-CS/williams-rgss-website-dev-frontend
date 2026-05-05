// These styles apply to every route in the application
import './styles.css';
import type { Metadata } from 'next';
import Navbar from '@/app/(public)/_ui/Navbar';
import Footer from '@/app/(public)/_ui/Footer';

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
        <Footer />
      </body>
  )
}
