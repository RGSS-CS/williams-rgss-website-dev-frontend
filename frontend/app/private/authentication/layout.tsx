import "@/app/(public)/styles.css";
import styles from "./authentication.module.css"; 
import Footer from "@/app/(public)/_components/footer/footer";
import { Metadata, ResolvingMetadata } from "next";
import Navbar from "@/app/(public)/_components/navbar/navbar";
import { getManagementSettings } from "@/app/_lib/management";
import { Suspense } from "react";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const management = await getManagementSettings();  
  return{
    title: (`Authentication - ${management?.schoolName} ${management?.councilName}`),
    description: (`This is the School Council Website of ${management?.schoolName}`),
  }
};

async function AuthChrome({ children }: { children: React.ReactNode }) {
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

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const management = await getManagementSettings();
    if (!management) return null;
    return (
        <Suspense fallback={null}>
            <AuthChrome>{children}</AuthChrome>
        </Suspense>
    );
}
