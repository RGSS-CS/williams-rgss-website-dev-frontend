import '@/app/(public)/styles.css';
import Footer from '@/app/(public)/_components/footer/footer';
import Navbar from '@/app/(public)/_components/navbar/navbar';
import { Suspense } from 'react';
import { getManagementSettings } from '@/app/_lib/management';

async function SiteChrome({ children }: { children: React.ReactNode }) {
  const management = await getManagementSettings();

  if (!management) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar management={management} />
      {children}
      <Footer management={management} />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<>{children}</>}>
      <SiteChrome>{children}</SiteChrome>
    </Suspense>
  )
}