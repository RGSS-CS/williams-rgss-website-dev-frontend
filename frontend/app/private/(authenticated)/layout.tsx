// These styles apply to every route in the application
import ExecSidebar from './_components/Sidebar';
import "./styles.css"
import { Suspense } from 'react';

import { getManagementSettings } from '@/app/_lib/site-management';

async function NavbarSlot() {
    const management = await getManagementSettings();
    return <ExecSidebar management={management} />;
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
