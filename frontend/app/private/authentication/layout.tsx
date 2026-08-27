import "@/app/(public)/styles.css";
import "@/app/private/authentication/styles.css";
import { Metadata } from "next";
import Footer from "@/app/(public)/_components/footer";
import Navbar from "@/app/(public)/_components/navbar";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSchoolYear } from "@/app/_utils/schoolYear";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Login or register to access your account.",
};

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const management = await getManagementSettings();

    return (
        <div className="authContent">
            <NavbarSlot/>
            {children}
            <FooterSlot/>
        </div>
    );
}
