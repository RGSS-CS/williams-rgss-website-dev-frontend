
import link from "next/link";
import Image from "next/image";
import styles from './public.module.css';
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

export default async function Page() {
    //const clubs = await getDjangoAPI();
    return (
        <main>
            <div className={styles.ticker}>
                <div className={styles.ticker_header}>
                    <h4 className="">Updates</h4>
                </div>
                <div className={styles.ticker_container}>
                    <div className={styles.ticker_inner} id="ticker-inner">
                    </div>
                </div>
            </div>
        </main>
    );
}