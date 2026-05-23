import { getClubs } from "@/app/_lib/club";

import ClubsDirectory from "./_components/ClubsDirectory";

export default async function ClubsPage() {
    const clubs = await getClubs();

    return <ClubsDirectory clubs={clubs} />;
}
