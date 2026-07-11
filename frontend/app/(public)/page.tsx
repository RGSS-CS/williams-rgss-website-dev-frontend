import Image from "next/image";
import { getSchoolYear } from "@/app/(public)/_utils/SchoolYear";
import styles from "./home.module.css";
import Footer from "@/app/(public)/_components/footer/footer";
import { isMobile } from "@/app/_utils/isMobile";
import MobileFooter from "@/app/(public)/_components/footer/mobileFooter";
import { headers } from "next/headers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Metadata, ResolvingMetadata } from 'next';
import { getManagementSettings } from "@/app/_lib/management";
//ICONS
import { faCalendarAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const management = await getManagementSettings();  
  return{
    title: (`${management?.schoolName} ${management?.councilName}`),
    description: (`This is the School Council Website of ${management?.schoolName}`),
  }
};

export async function FooterWrapper() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobileDevice = isMobile(userAgent);
  const management = await getManagementSettings();

  if (!management) return null;

  return isMobileDevice ? (
    <MobileFooter management={management}/>
  ) : (
    <Footer management={management}/>
  )
};

export default async function Page() {
  const management = await getManagementSettings();
  if (!management) return null;
  //const clubs = await getDjangoAPI();
  return (
    <main>
      <div className="hero">
        <div className="hero_shape"></div>
        <div className="hero_inner">
          <div className="hero_left">
            <div className={styles.heroTag}>
              <p>{management.councilName} {getSchoolYear()}</p>
            </div>
            <div className="hero_title">
              <h1>{management.schoolName}</h1>
              <h2>{management.councilName}</h2>
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
