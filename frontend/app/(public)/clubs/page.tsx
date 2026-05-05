import handleSearch from "@/app/(public)/_utils/HandleSearch";
import { resetAll } from "@/app/(public)/_utils/filterCategory"
import FilterBar from "@/app/(public)/_ui/MobileFilterBar";
import styles from "@/app/(public)/clubs/clubs.module.css";
import Filter from "@/app/(public)/_ui/FilterBar";

//async function getDjangoAPI(): Promise<Club[]> {
//    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/clubs', {
//        cache: "no-store",
//    });

//    if (!res.ok) throw new Error("Failed to fetch clubs");
//    return res.json();
//}

export default function ClubsPage() {
    //const clubs = await getDjangoAPI();
    return (
        <main>
            <div className="hero">
                <div className="hero_shape"></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className="hero_title">
                            <h1>Find your</h1>
                            <h2>club</h2>
                        </div>
                        <div className="hero_subtitle">
                            <h5>Explore every club, team, and organization at Dr. GW. Williams S.S.</h5>
                            <h5>Find where you belong</h5>
                        </div>
                        <div className="search_container">
                            <i className="fas fa-search"></i>
                            <input className="search_input" id="club_search" type="text" placeholder="Search by club name, location or time..." onChange={handleSearch} autoComplete="off"></input>
                        </div>
                        <div className={styles.heroStats}>
                            <div className={styles.heroStat}>
                                <span className="stat-num" id="totalCount">0</span>
                                <span className="stat-label">Total Clubs</span>
                            </div>
                            <div className={styles.heroStat}>
                                <span className="stat-num" id="totalCategories">0</span>
                                <span className="stat-label">Categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky-wrapper">
                <FilterBar>
                    <Filter />
                    <span className={`results-count ${styles.resultsCount}`} id="resultsCount" data-results-count>Showing 0 clubs</span>
                    {/*Fix Server/Client components, refer: https://nextjs.org/docs/app/getting-started/server-and-client-components */}
                </FilterBar>
                <div className={styles.mobileResultsBar}>
                    <span className={`results-count results-count-mobile ${styles.resultsCount} ${styles.resultsCountMobile}`} data-results-count>Showing 0 clubs</span>
                </div>
                <div className="category_container" id="clubs_container">
                    <div className="category-section" data-category="academic" id="cat-academic">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title"><i className="fas fa-book"></i>Academic</span>
                            <div className="category-divider"></div>
                            <span className="category-count">0 clubs</span>
                        </div>
                        <div className="clubs-grid">{/*Where the academic clubs go (FIX)*/}</div>
                    </div>
                    <div className="category-section" data-category="arts" id="cat-arts">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title"><i className="fas fa-palette"></i>Arts</span>
                            <div className="category-divider"></div>
                            <span className="category-count">0 clubs</span>
                        </div>
                        <div className="clubs-grid">
                            {/*Where the arts clubs go (FIX)*/}
                        </div>
                    </div>
                    <div className="category-section" data-category="community" id="cat-community">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title"><i className="fas fa-hands-helping"></i>Community</span>
                            <div className="category-divider"></div>
                            <span className="category-count">0 clubs</span>
                        </div>
                        <div className="clubs-grid">
                            {/*Where the community clubs go (FIX)*/}
                        </div>
                    </div>
                    <div className="category-section" data-category="sports" id="cat-sports">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title"><i className="fas fa-running"></i>Sports &amp; Recreation</span>
                            <div className="category-divider"></div>
                            <span className="category-count">0 clubs</span>
                        </div>
                    </div>
                    <div className={styles.emptyState} id="emptyState">
                        <i className="fas fa-search"></i>
                        <h3>No Clubs Found</h3>
                        <p>Try a different search term or clear your filters</p>
                        <button className="cta-btn" onClick={resetAll}><i className="fas fa-undo"></i>Reset Filters</button>
                    </div>
                </div>
            </div>
            <div className={styles.ctaBanner}>
                <h2>Don&apos;t See Your Club? <span>Start One.</span></h2>
                <p>Any GW Williams student can start a new club. Talk to a teacher that is interested with your idea.</p>
            </div>
        </main>
    );
}
