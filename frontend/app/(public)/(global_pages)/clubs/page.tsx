import { getClubs } from "@/app/_lib/club";

import ClubsDirectory from "./_components/ClubsDirectory";

export const dynamic = "force-dynamic";

export default async function ClubsPage() {
    const clubs = await getClubs();

    return <ClubsDirectory clubs={clubs} />;
}
