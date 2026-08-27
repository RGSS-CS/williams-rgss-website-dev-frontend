import Image from "next/image";
import Link from "next/link";
import { getSchoolYear } from "@/app/_utils/schoolYear";
import styles from "./home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { getPageManagementSettings } from "@/app/_lib/page-management";
import TickerBar from "@/app/(public)/_components/tickerBar";
import SchoolMap from "@/app/(public)/_components/schoolMap";
import SchoolLocation from "@/app/_utils/formatLocation";

//ICONS
import { faCalendarAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata();
}

export default async function Page() {
  const management = await getManagementSettings();
  const pageManagement = await getPageManagementSettings("HM");
  const schoolYear = await getSchoolYear();
  const [mapsUrl] = SchoolLocation({ management });

  return (
    <main>
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

              <Link href='/events' className={styles.heroBtnSecondary}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Upcoming Events</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
    </main>
  );
}
