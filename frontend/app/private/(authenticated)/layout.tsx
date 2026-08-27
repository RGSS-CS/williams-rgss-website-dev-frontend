// These styles apply to every route in the application
import Sidebar from "./components/sidebar";
import "./styles.css";
import { Suspense } from "react";

import { getManagementSettings } from '@/app/_lib/site-management';

async function NavbarSlot() {
    const management = await getManagementSettings();
    return <Sidebar management={management} />;
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Suspense>
                <NavbarSlot />
            </Suspense>
            {children}
        </>
    );
}
