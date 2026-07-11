// These styles apply to every route in the application
import '@/app/(public)/styles.css';
import Footer from '@/app/(public)/_components/footer/footer';
import Navbar from '@/app/(public)/_components/navbar/navbar';
import { Suspense } from 'react';
import { getManagementSettings } from '@/app/_lib/management';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const management = await getManagementSettings();

  if (!management) {
    return <>{children}</>;
  }

  return (
    <>
    <Suspense>
      <Navbar management={management}/>
      {children}
      <Footer management={management} />
    </Suspense>
    </>
  )
}