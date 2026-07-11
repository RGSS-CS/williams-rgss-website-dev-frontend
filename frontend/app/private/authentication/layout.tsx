import "@/app/(public)/styles.css";
import styles from "./authentication.module.css"; 
import Footer from "@/app/(public)/_components/footer/footer";
import Navbar from "@/app/(public)/_components/navbar/navbar";
import { getManagementSettings } from "@/app/_lib/management";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const management = await getManagementSettings();
    if (!management) return null;
    return (
        <main className={styles.page}>
            <Navbar management={management}/>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.footerWrap}>
                <Footer management={management}/>
            </div>
        </main>
    )
}
