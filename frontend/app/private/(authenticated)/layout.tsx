// These styles apply to every route in the application
import Sidebar from "./components/sidebar";
import "./styles.css";
import { Suspense } from "react";

import { getManagementSettings } from '@/app/_lib/site-management';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function NavbarSlot() {
    const management = await getManagementSettings();
    return <Sidebar management={management} />;
}

function getGroups(value: string | undefined) {
    if (!value) {
        return [];
    }

    try {
        const groups = JSON.parse(value);
        return Array.isArray(groups) ? groups : [];
    } catch {
        return [];
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const groups = getGroups(cookieStore.get("user_groups")?.value);
    if (!accessToken || groups.includes("Public Verified")) {
        redirect("/private/authentication");
    }

    return (
        <>
            <Suspense>
                <NavbarSlot />
            </Suspense>
            {children}
        </>
    );
}
