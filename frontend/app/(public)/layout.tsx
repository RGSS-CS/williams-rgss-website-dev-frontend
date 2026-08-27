import "@/app/(public)/styles.css";
import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import { Suspense } from "react";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSchoolYear } from "@/app/_utils/schoolYear";

async function NavbarSlot() {
  const management = await getManagementSettings();
  return (
    <Suspense fallback={null}>
      <Navbar management={management} />
    </Suspense>
  );
}

async function FooterSlot() {
  const [management, schoolYear] = await Promise.all([getManagementSettings(), getSchoolYear()]);

  return <Footer management={management} schoolYear={schoolYear} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarSlot />
      {children}
      <FooterSlot />
    </>
  );
}
