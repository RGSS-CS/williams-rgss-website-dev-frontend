
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

function getSchoolYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    if (month >= 8) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}

export default async function Page() {
    //const clubs = await getDjangoAPI();
    return (
        <main>
            <div className={styles.ticker_bar}>
                <div className={styles.ticker_header}>
                    <h4><i className="fas fa-star"></i> Updates</h4>
                </div>

                <div className={styles.ticker_track}>
                    <div className={styles.ticker_inner} id="ticker-inner">
                    </div>
                </div>
            </div>
            <div className={styles.hero}>
                <div className={styles.hero_shape}></div>
                <div className={styles.hero_inner}>
                    <div className={styles.hero_left}>
                        <div className={styles.hero_tag}>
                            <h4>Student Council {getSchoolYear()}</h4>
                        </div>
                        <div className={styles.hero_title}>
                            <h1>GW. Williams</h1>
                            <h1>STUCO</h1>
                        </div>
                        <div className={styles.hero_tagline}>
                            <h5>Representing Student Voice.</h5>
                            <h5>Building Wildcat Spirit.</h5>
                        </div>
                        <div className={styles.hero_buttons}>
                            <div className={styles.hero_btn_primary}>
                                <a href="/public/clubs" className={styles.hero_btn_text}>
                                    <i className="fas fa-paper-plane"></i> Our Clubs
                                </a>
                            </div>
                            <div className={styles.hero_btn_secondary}>
                                <a href="#" className={styles.hero_btn_text_alt}>
                                    <i className={`fas fa-calendar-alt ${styles.fas_fa_calendar_alt}`}></i> Upcoming Events
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.hero_badge_image}>
                        <Image src="/images/logo/wildcat-icon.png" alt="Wildcat Icon" width={230} height={200} />
                    </div>
                </div>
                <div className={styles.hero_photo_strip}>
                </div>
            </div>
            <div className={`${styles.section_wrap} ${styles.announcements_section}`}>
                <div className={styles.section_content}>
                    <div className={styles.section_title}>
                        <h2 className={styles.section_title}>
                            <span className={styles.section_title_accent}></span>
                            Announcements
                        </h2>
                    </div>
                    <div className={styles.card_container}>
                        <div className={styles.card_row}>

                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.section_wrap} ${styles.events_section}`} id="events">
                
            </div>
        </main>
    );
}