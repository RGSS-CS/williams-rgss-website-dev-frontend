import { getClubs } from "@/app/_lib/club";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import { getPageManagementSettings } from "@/app/_lib/page-management";
import styles from "@/app/(public)/clubs/clubs.module.css";
import ClubsFilterClient from "./clubsFilterClient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Clubs");
}

export const instant = false;

export default async function ClubsPage() {
  const clubs = await getClubs();
  const management = await getManagementSettings();
  const pageManagement = await getPageManagementSettings("CL");

  return (
    <main>
      <div className='hero'>
        <div className='hero_shape'></div>

        <div className='hero_inner'>
          <div className='hero_left'>
            <div className='hero_title'>
              <h1>{pageManagement?.title}</h1>
              <h2>{pageManagement?.subtitle}</h2>
            </div>

            <div className='hero_subtitle'>
              <p>{pageManagement?.tagline}</p>
            </div>

            <div className='search_container'>
              <FontAwesomeIcon icon={faSearch} className='search_container_icon' />

              <ClubsFilterClient clubs={clubs} searchOnly />
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className='stat-num'>{clubs.length}</span>
                <span className='stat-label'>Total Clubs</span>
              </div>

              <div className={styles.heroStat}>
                <span className='stat-num'>
                  {
                    Array.from(new Set(clubs.flatMap((club) => club.categories).filter(Boolean)))
                      .length
                  }
                </span>

                <span className='stat-label'>Categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClubsFilterClient clubs={clubs} />

      <div className={styles.ctaBanner}>
        <h2>
          Don&apos;t See Your Club? <span>Start One.</span>
        </h2>

        <p>
          Any {management?.schoolName ?? ""} student can start a new club. Talk to a teacher that is
          interested with your idea.
        </p>
      </div>
    </main>
  );
}
