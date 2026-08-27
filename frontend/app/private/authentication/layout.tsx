import "@/app/(public)/styles.css";
import "@/app/private/authentication/styles.css";
import { Metadata } from "next";
import Footer from "@/app/(public)/_components/footer";
import Navbar from "@/app/(public)/_components/navbar";
import { getManagementSettings } from "@/app/_lib/site-management";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Login or register to access your account.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const management = await getManagementSettings();

    return (
        <div className="authContent">
            <Navbar management={management} />
            {children}
            <Footer management={management} />
        </div>
    );
}
