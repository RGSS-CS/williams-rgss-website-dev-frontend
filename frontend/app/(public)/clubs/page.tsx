import { getClubs } from "@/app/_lib/club";
import { getManagementSettings } from "@/app/_lib/management";
import ClubsDirectory from "./_components/ClubsDirectory";
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const management = await getManagementSettings();  
  return{
    title: (`Clubs - ${management?.schoolName} ${management?.councilName}`),
    description: (`This is the School Council Website of ${management?.schoolName}`),
  }
};

export default async function ClubsPage() {
    const clubs = await getClubs();
    const management = await getManagementSettings();
    if (!management) return null;

    return <ClubsDirectory clubs={clubs} management={management} />;
}