import { getClubs } from "@/app/_lib/club";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import ClubsDirectory from "./_ClubsDirectory";
import { Metadata } from 'next';
import { getPageManagementSettings } from "@/app/_lib/page-management";

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata("Clubs");
};

export default async function ClubsPage() {
    const clubs = await getClubs();
    const management = await getManagementSettings();
    const pageManagement = await getPageManagementSettings("CL");

    return <ClubsDirectory clubs={clubs} management={management} pageManagement={pageManagement} />;
}
