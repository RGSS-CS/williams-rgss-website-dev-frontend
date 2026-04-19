import link from "next/link";
import Image from "next/image";
import styles from './clubs.module.css';
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
            <div className="hero">
                <div className="hero_shape"></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className="hero_title">
                            <h1>Find your</h1>
                            <h2>club</h2>
                        </div>
                        <div className="hero_subtitle">
                            <h5>Explore every club, team, and organization at Dr. GW. Williams S.S.</h5>
                            <h5>Find where you belong</h5>
                        </div>
                        <div className="search_container">
                            <i className="fas fa-search"></i>
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}