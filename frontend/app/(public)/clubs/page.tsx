import { getClubs } from "@/app/_lib/club";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import { getPageManagementSettings } from "@/app/_lib/page-management";
import styles from "@/app/(public)/clubs/clubs.module.css";
import ClubsFilterClient from "./clubsFilterClient";
import { Suspense } from "react";
import PublicHeroLoading from "@/app/(public)/_components/publicHeroLoading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Clubs");
}

export const instant = false;

async function ClubsHero() {
  const [clubs, pageManagement] = await Promise.all([
    getClubs(),
    getPageManagementSettings("CL"),
  ]);

  return (
    <div className='hero'>
      <div className='heroShape'></div>

      <div className='heroInner'>
        <div className='heroLeft'>
          <div className='heroTitle'>
            <h1>{pageManagement?.title}</h1>
            <h2>{pageManagement?.subtitle}</h2>
          </div>

          <div className='heroSubtitle'>
            <p>{pageManagement?.tagline}</p>
          </div>

          <div className='searchContainer'>
            <FontAwesomeIcon icon={faSearch} className='searchContainerIcon' />

            <ClubsFilterClient clubs={clubs} searchOnly />
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className='statNum'>{clubs.length}</span>
              <span className='statLabel'>Total Clubs</span>
            </div>

            <div className={styles.heroStat}>
              <span className='statNum'>
                {
                  Array.from(new Set(clubs.flatMap((club) => club.categories).filter(Boolean)))
                    .length
                }
              </span>

              <span className='statLabel'>Categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function ClubsExplorer() {
  const clubs = await getClubs();

  return <ClubsFilterClient clubs={clubs} />;
}

async function ClubsCta() {
  const management = await getManagementSettings();

  return (
    <div className={styles.ctaBanner}>
      <h2>
        Don&apos;t See Your Club? <span>Start One.</span>
      </h2>

      <p>
        Any {management?.schoolName ?? ""} student can start a new club. Talk to a teacher that is
        interested with your idea.
      </p>
    </div>
  );
}

export default function ClubsPage() {
  return (
    <main>
      <Suspense fallback={<PublicHeroLoading search stats={2} />}>
        <ClubsHero />
      </Suspense>

      <Suspense fallback={null}>
        <ClubsExplorer />
      </Suspense>

      <Suspense fallback={null}>
        <ClubsCta />
      </Suspense>
    </main>
  );
}
