import Image from "next/image";
import Link from "next/link";
import "@/app/(public)/styles.css";
import styles from "./authentication.module.css"; 
import Footer from "@/app/(public)/_components/footer";
import { Metadata } from "next";
import Navbar from "@/app/(public)/_components/navbar";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Login or register to access your account.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={styles.page}>
            <Navbar />
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.footerWrap}>
                <Footer />
            </div>
        </main>
    )
}
