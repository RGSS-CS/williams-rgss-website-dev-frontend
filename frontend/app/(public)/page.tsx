import Image from "next/image";
import { getSchoolYear } from "@/app/_utils/SchoolYear";
import styles from "./home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { getPageManagementSettings } from "@/app/_lib/page-management";
import TickerBar from "@/app/(public)/_components/TickerBar";
import SchoolMap from "@/app/(public)/_components/SchoolMap";
import SchoolLocation from "@/app/_utils/formatLocation";

//ICONS
import { faCalendarAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata();
}

export default async function Page() {
    const management = await getManagementSettings();
    const pageManagement = await getPageManagementSettings("HM");
    const [mapsUrl] = SchoolLocation({ management });

    return (
        <main>

            <div className="hero">
                <TickerBar />
                <div className={styles.heroBadgeImage}>
                    <Image
                        src="/images/logo/wildcat-icon.png"
                        alt="Wildcat Icon"
                        width={260}
                        height={230}
                    />
                </div>

                <div className={`hero_shape ${styles.hero_shape}`}></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className={styles.heroTag}>
                            <p>{management?.councilName} {getSchoolYear()}</p>
                        </div>
                        <div className="hero_title">
                            <h1>{pageManagement?.title}</h1>
                            <h2>{pageManagement?.subtitle}</h2>
                        </div>
                        <div className="hero_subtitle">
                            <p>{pageManagement?.tagline}</p>
                        </div>

                        <div className={styles.heroButtons}>
                            <a href="/clubs">
                                <div className={styles.heroBtnPrimary}>
                                    <p className={styles.heroBtnText}>
                                        <FontAwesomeIcon icon={faPaperPlane} /> Our Clubs
                                    </p>
                                </div>
                            </a>

                            <a href="/events">
                                <div className={styles.heroBtnSecondary}>
                                    <p className={styles.heroBtnTextAlt}>
                                        <FontAwesomeIcon icon={faCalendarAlt} /> Upcoming Events
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.sectionWrap}>
                <div className="section_content">
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Announcements
                        </h2>
                    </div>
                    <div className={styles.cardContainer}>
                        <div className="card_row">
                            {/* Put Announcement cards here after database is set up */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.sectionWrap} id="events">
                <div className={styles.sectionTitle}>
                    <span className={styles.sectionTitleAccent}></span>
                    <h2 className={styles.sectionTitle}>Events</h2>
                </div>
                {/*Add calendar page*/}
            </div>
            <div className={styles.sectionWrap}>
                <div className="section_content">
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Meet the Council
                        </h2>
                    </div>
                    <div className={styles.cardContainer}>
                        <div className="card_row">{/*Add section for school council*/}</div>
                    </div>
                </div>
            </div>
            <div className={styles.sectionWrap}>
                <div className={styles.map_section}>
                    <div className="section-divider"></div>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Find Us
                        </h2>
                    </div>
                    <SchoolMap locations={management?.schoolLocation ?? null} />
                    <a href={mapsUrl ? mapsUrl : "#"} target="_blank" rel="noopener noreferrer"> 
                        View on Google Maps
                    </a>
                </div>
            </div>
        </main >
    );
}
