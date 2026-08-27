import "@/app/(public)/styles.css";
import Footer from "@/app/(public)/_components/footer";
import Navbar from "@/app/(public)/_components/navbar";

import { getManagementSettings } from "@/app/_lib/site-management";
import { getSchoolYear } from "@/app/_utils/schoolYear";

async function NavbarSlot() {
  const management = await getManagementSettings();
  return <Navbar management={management} />;
}

async function FooterSlot() {
  const [management, schoolYear] = await Promise.all([
    getManagementSettings(),
    getSchoolYear(),
  ]);

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
