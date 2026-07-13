// These styles apply to every route in the application
import '@/app/(public)/styles.css';
import Footer from '@/app/(public)/_components/footer/footer';
import Navbar from '@/app/(public)/_components/navbar/navbar';
import NavbarLoading from '@/app/(public)/_components/navbar/loading';
import FooterLoading from '@/app/(public)/_components/footer/loading';
import { Suspense } from 'react';

import { getManagementSettings } from '@/app/_lib/management';
import { isBuildPhase } from "@/app/_utils/isBuildPhase";

async function NavbarSlot() {
  const management = await getManagementSettings();
  if (!management) {
    if (isBuildPhase()) return null;
    throw new Error("Unable to load site settings.");
  }
  return <Navbar management={management} />;
}
 
async function FooterSlot() {
  const management = await getManagementSettings();
  if (!management) {
    if (isBuildPhase()) return null;
    throw new Error("Unable to load site settings.");
  }
  return <Footer management={management} />;
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<NavbarLoading />}>
        <NavbarSlot />
      </Suspense>
      {children}
      <Suspense fallback={<FooterLoading />}>
        <FooterSlot />
      </Suspense>
    </>
  )
}