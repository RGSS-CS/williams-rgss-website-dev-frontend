import { getManagementSettings } from "@/app/_lib/management";

export default async function ExecDashboard() {
    const management = await getManagementSettings();

    return (
        <main>
        </main>
    );
}