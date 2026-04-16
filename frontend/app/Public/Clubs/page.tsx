import link from "next/link";

type Club = {
    id: number;
    name: string;
    description: string;
}

async function getClubs(): Promise<Club[]> {
    const res = await fetch("http://localhost:8080/api/clubs", {
        cache: "no-store",
});

if (!res.ok) throw new Error("Failed to fetch clubs");
return res.json();
}

export default async function ClubsPage() {
    const clubs = await getClubs();
    return (
        
}