// These styles apply to every route in the application
import '@/app/(public)/styles.css';
import Footer from '@/app/(public)/_components/footer/footer';
import Navbar from '@/app/(public)/_components/navbar/navbar';
import { Suspense } from 'react';

import { getManagementSettings } from '@/app/_lib/management';

async function NavbarSlot() {
  const management = await getManagementSettings();
  return <Navbar management={management} />;
}
 
async function FooterSlot() {
  const management = await getManagementSettings();
  return <Footer management={management} />;
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense>
        <NavbarSlot />
      </Suspense>
      {children}
      <Suspense>
        <FooterSlot />
      </Suspense>
    </>
  )
}