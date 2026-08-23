import "@/app/(public)/styles.css";
import styles from "./styles.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Login or register to access your account.",
};

export default function RootLayout(
    { children }: { children: React.ReactNode; }
) {
    return (
        <main className={styles.page}>
            <div className={styles.content}>{children}</div>
        </main>
    );
}
