import Image from "next/image";
import { getSchoolYear } from "@/app/_utils/SchoolYear";
import styles from "./home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import { getManagementSettings } from "@/app/_lib/management";
import { getSiteMetadata } from "@/app/_lib/metadata";
//ICONS
import { faCalendarAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata();
}

export default async function Page() {
  const management = await getManagementSettings();
  //const clubs = await getDjangoAPI();
  return (
    <main>
      <div className="hero">
        <div className="hero_shape"></div>
        <div className="hero_inner">
          <div className="hero_left">
            <div className={styles.heroTag}>
              <p>{management?.councilName} {getSchoolYear()}</p>
            </div>
            <div className="hero_title">
              <h1>{management?.schoolName}</h1>
              <h2>{management?.councilName}</h2>
            </div>
            <div className="hero_subtitle">
              <p>Representing Student Voice.</p>
              <p>Building Wildcat Spirit.</p>
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
          <div className={styles.heroBadgeImage}>
            <Image
              src="/images/logo/wildcat-icon.png"
              alt="Wildcat Icon"
              width={230}
              height={200}
            />
          </div>
        </div>
        <div className={styles.heroPhotoStrip}>
          {/* Add photos here after database is set up */}
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
    </main >
  );
}