// These styles apply to every route in the application
import './styles.css';
import type { Metadata } from 'next';
import Navbar from '@/app/(public)/_ui/navbar';
import Footer from '@/app/(public)/_ui/footer';

export const metadata: Metadata = {
  title: 'Dr. GW Williams STUCO',
  description: 'STUCO Cloud Portal for Dr. GW Williams Secondary School',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
  )
}
