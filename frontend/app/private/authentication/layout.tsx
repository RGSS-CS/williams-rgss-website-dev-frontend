import Image from "next/image";
import "@/app/(public)/styles.css";
import Footer from "@/app/(public)/_ui/footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <nav className="navbar">
                <div className="header-container">
                    <a className="title-container" href="/">
                        <div className="logo">
                            <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
                        </div>
                        <div>
                            <span className="school-title"><h1>Dr. GW Williams S.S.</h1></span>
                            <span className="school-subtitle">Student Council</span>
                        </div>
                    </a>
                </div>
            </nav>
            {children}
            <Footer />
        </main>
    )
}