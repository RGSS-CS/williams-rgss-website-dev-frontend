import Image from "next/image";
import { getSchoolYear } from "@/app/(public)/_utils/SchoolYear";
import styles from "./home.module.css";
import Navbar from "@/app/(public)/_components/navbar";
import Footer from "@/app/(public)/_components/footer";
import { isMobile } from "@/app/_utils/isMobile";
import MobileFooter from "@/app/(public)/_components/mobileFooter";
import { headers } from "next/headers";
import { Suspense } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Metadata } from 'next';
//ICONS
import { faCalendarAlt, faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons'

export const metadata: Metadata = {
  title: 'Dr. GW Williams STUCO',
  description: 'STUCO Cloud Portal for Dr. GW Williams Secondary School',
};

export async function FooterWrapper() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobileDevice = isMobile(userAgent);

  return isMobileDevice ? (
    <MobileFooter />
  ) : (
    <Footer />
  )
}

export default async function Page() {
  //const clubs = await getDjangoAPI();
  return (
    <main>
      <div className={styles.topBar}>
        <Navbar />
        <div className={styles.tickerBar}>
          <div className={styles.tickerHeader}>
            <h3>
              <FontAwesomeIcon icon={faStar} /> Updates
            </h3>
          </div>

          <div className="ticker_track">
            <div className="ticker_inner" id="ticker-inner"></div>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="hero_shape"></div>
        <div className="hero_inner">
          <div className="hero_left">
            <div className={styles.heroTag}>
              <p>Student Council {getSchoolYear()}</p>
            </div>
            <div className="hero_title">
              <h1>GW. Williams</h1>
              <h2>STUCO</h2>
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
      <Suspense><FooterWrapper /></Suspense>
      
    </main >
  );
}
