import "@/app/(public)/styles.css";
import styles from "./authentication.module.css"; 
import Footer from "@/app/(public)/_components/footer/footer";
import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/app/(public)/_components/navbar/navbar";
import { getManagementSettings } from "@/app/_lib/management";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Login or register to access your account.",
};

async function NavbarSlot() {
    const management = await getManagementSettings();
    if (!management) return null;
    return <Navbar management={management} />;
}

async function FooterSlot() {
    const management = await getManagementSettings();
    if (!management) return null;
    return <Footer management={management} />;
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={styles.page}>
            <Suspense fallback={null}>
                <NavbarSlot />
            </Suspense>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.footerWrap}>
                <Suspense fallback={null}>
                    <FooterSlot />
                </Suspense>
            </div>
        </main>
    )
}