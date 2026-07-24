import { getManagementSettings } from "@/app/_lib/management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import styles from "dashboard.module.css";

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata("Exec Dashboard");
}

export default async function ExecDashboard() {
    const management = await getManagementSettings();

    return (
        <main>
        </main>
    );
}