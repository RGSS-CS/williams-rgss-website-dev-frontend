// These styles apply to every route in the application
import '@/app/(public)/styles.css';
import Footer from '@/app/(public)/_components/footer/footer';
import Navbar from '@/app/(public)/_components/navbar/navbar';
import { Suspense } from 'react';
import { getManagement } from '@/app/_lib/management';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const management = await getManagement();
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      {children}
      <Footer management={management} />
    </>
  )
}