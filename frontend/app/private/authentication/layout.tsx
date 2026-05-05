import Image from "next/image";
import Link from "next/link";
import "@/app/(public)/styles.css";
import styles from "./authentication.module.css";
import Footer from "@/app/(public)/_ui/footer";
import LoginBackButton from "@/app/private/authentication/_ui/LoginBackButton";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <nav className="navbar">
                <div className="header-container">
                    <div className="title-container">
                        <LoginBackButton />
                        <Link href="/" className="brand-link">
                            <div className="logo">
                                <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
                            </div>
                            <div className="brand-copy">
                                <h1 className="school-title">Dr. GW Williams S.S.</h1>
                                <span className="school-subtitle">Student Council</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
            {children}
            <div className={styles.footer}>
                <Footer />
            </div>
        </main>
    )
}
