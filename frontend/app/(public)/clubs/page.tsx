import { getClubs } from "@/app/_lib/club";
import { getManagementSettings } from "@/app/_lib/management";
import ClubsDirectory from "./_components/ClubsDirectory";
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from "react";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const management = await getManagementSettings();  
  return{
    title: (`Clubs - ${management?.schoolName} ${management?.councilName}`),
    description: (`This is the School Council Website of ${management?.schoolName}`),
  }
};

async function ClubsContent() {
    const clubs = await getClubs();
    const management = await getManagementSettings();
    if (!management) return null;

    return <ClubsDirectory clubs={clubs} management={management} />;
}

export default function ClubsPage() {
    return (
        <Suspense fallback={null}>
            <ClubsContent />
        </Suspense>
    );
}