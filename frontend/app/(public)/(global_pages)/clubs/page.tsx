import { getClubs } from "@/app/_lib/club";
import ClubsDirectory from "./_components/ClubsDirectory";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Clubs",
    description: "Explore the diverse range of clubs and organizations",
};

export default async function ClubsPage() {
    const clubs = await getClubs();

    return <ClubsDirectory clubs={clubs} />;
}
