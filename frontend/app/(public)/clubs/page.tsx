import { getClubs } from "@/app/_lib/club";
import { getManagementSettings } from "@/app/_lib/management";
import { getSiteMetadata } from "@/app/_lib/metadata";
import ClubsDirectory from "./_components/ClubsDirectory";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Clubs");
};

export default async function ClubsPage() {
    const clubs = await getClubs();
    const management = await getManagementSettings();
    if (!management) throw new Error("Unable to load site settings.");

    return <ClubsDirectory clubs={clubs} management={management} />;
}