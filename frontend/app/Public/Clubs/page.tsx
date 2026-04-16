import link from "next/link";
import Image from "next/image";
// import { Club } from "@/types/club";

type Club = {
    id: number;
    name: string;
    description: string;
}

//async function getDjangoAPI(): Promise<Club[]> {
//    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/clubs', {
//        cache: "no-store",
//    });

//    if (!res.ok) throw new Error("Failed to fetch clubs");
//    return res.json();
//}

export default async function ClubsPage() {
    //const clubs = await getDjangoAPI();
    return (
        <main>
            <h1 className="text-3xl font-bold mb-6">Clubs</h1>
        </main>
    );
}