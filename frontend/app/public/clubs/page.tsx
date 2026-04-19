import link from "next/link";
import Image from "next/image";
import styles from './clubs.module.css';
import { getSchoolYear } from "@/utils/SchoolYear"
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
                        <div className="hero_tag">
                            <h4>Student Council {getSchoolYear()}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}