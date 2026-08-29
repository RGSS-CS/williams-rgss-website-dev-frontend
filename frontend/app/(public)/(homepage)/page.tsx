import Image from "next/image";
import Link from "next/link";
import { getSchoolYear } from "@/app/_utils/schoolYear";
import styles from "./home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { getPageManagementSettings } from "@/app/_lib/page-management";
import TickerBar from "./_components/tickerBar";
import SchoolMap from "@/app/(public)/_components/schoolMap";
import SchoolLocation from "@/app/_utils/formatLocation";
import { Suspense } from "react";
import PublicHeroLoading from "@/app/(public)/_components/publicHeroLoading";
import AnchorLink from "@/app/(public)/_components/anchorLink";

//ICONS
import { faCalendarAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata();
}

async function HomeHero() {
    const [management, pageManagement, schoolYear] = await Promise.all([
        getManagementSettings(),
        getPageManagementSettings("HM"),
        getSchoolYear(),
    ]);

    return (
        <div className='hero'>
            <TickerBar />
            <div className={styles.heroBadgeImage}>
                {management?.croppedSiteImage && (
                    <Image
                        src={management?.croppedSiteImage}
                        alt='Wildcat Icon'
                        width={260}
                        height={230}
                        loading='eager'
                    />
                )}
            </div>

            <div className={styles.heroShape}></div>
            <div className='hero_inner'>
                <div className='hero_left'>
                    <div className={styles.heroTag}>
                        <p>
                            {management?.councilName} {schoolYear}
                        </p>
                    </div>
                    <div className='hero_title'>
                        <h1>{pageManagement?.title}</h1>
                        <h2>{pageManagement?.subtitle}</h2>
                    </div>
                    <div className='hero_subtitle'>
                        <p>{pageManagement?.tagline}</p>
                    </div>

                    <div className={styles.heroButtons}>
                        <Link href='/clubs' className={styles.heroBtnPrimary}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <span>Our Clubs</span>
                        </Link>

                        <AnchorLink href='#events' className={styles.heroBtnSecondary}>
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span>Upcoming Events</span>
                        </AnchorLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function FindUsSection() {
    const management = await getManagementSettings();
    const [mapsUrl] = SchoolLocation({ management });

    return (
        <div className={styles.sectionWrap}>
            <div className={styles.mapSection}>
                <div className={styles.sectionDivider}></div>
                <div className={styles.sectionTitleRow}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionTitleAccent}></span>
                        Find Us
                    </h2>
                </div>
                <SchoolMap locations={management?.schoolLocation ?? null} />
                <a
                    href={mapsUrl ? mapsUrl : "#"}
                    className={styles.mapLink}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    View on Google Maps
                </a>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <main>
            <Suspense fallback={<PublicHeroLoading badge buttons tag ticker />}>
                <HomeHero />
            </Suspense>
            <div className={styles.sectionWrap}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Announcements
                        </h2>
                    </div>
                    <div className={styles.cardContainer}>
                        <div className={styles.cardRow}>
                            {/* Put Announcement cards here after database is set up */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.sectionWrap} id='events'>
                <div className={styles.sectionTitleRow}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionTitleAccent}></span>
                        Events
                    </h2>
                </div>
                {/*Add calendar page*/}
            </div>
            <div className={styles.sectionWrap}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Meet the Council
                        </h2>
                    </div>
                    <div className={styles.cardContainer}>
                        <div className={styles.cardRow}>{/*Add section for school council*/}</div>
                    </div>
                </div>
            </div>
            <Suspense fallback={null}>
                <FindUsSection />
            </Suspense>
        </main>
    );
}
