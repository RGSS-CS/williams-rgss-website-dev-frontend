import link from "next/link";
import Image from "next/image";
import handleSearch from "@/utils/HandleSearch";
import filterCategory from "@/utils/filterCategory"
import filterDay from "@/utils/filterCategory"
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

export default async function ClubsPage() {
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
                            <input className="search_input" id="club_search" type="text" placeholder="Search by club name, location or time..." onInput={handleSearch()} autoComplete="off"></input>
                        </div>
                        <div className="hero_stats">
                            <div className="hero_stat">
                                <span className="stat-num" id="totalCount">0</span>
                                <span className="stat-label">Total Clubs</span>
                            </div>
                            <div className="hero_stat">
                                <span className="stat-num" id="totalCategories">0</span>
                                <span className="stat-label">Categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky-wrapper">
                <div className="filter_bar_container">
                    <div className="filter_bar">
                        <span className="filter_label">
                            <i className="fas fa-filter"></i>
                            Filter
                        </span>
                        <button className="filter-chip active gold" onClick={filterCategory('all', this)}>All Clubs</button>
                        <button className="filter-chip" onClick={filterCategory('academic', this)}>
                            <i className="fas fa-book"></i>
                            Academic
                        </button>
                        <button className="filter-chip" onClick={filterCategory('arts', this)}>
                            <i className="fas fa-palette"></i>
                            Arts
                        </button>
                        <button className="filter-chip" onClick={filterCategory('community', this)}>
                            <i className="fas fa-hands-helping"></i>
                            Community
                        </button>
                        <button className="filter-chip" onClick={filterCategory('sports', this)}>
                            <i className="fas fa-running"></i>
                            Sports &amp; Rec
                        </button>
                        <div className="filter_divider"></div>
                        <button className="filter-chip" onClick={filterDay('Mon', this)}>Mon</button>
                        <button className="filter-chip" onClick={filterDay('Tue', this)}>Tue</button>
                        <button className="filter-chip" onClick={filterDay('Wed', this)}>Wed</button>
                        <button className="filter-chip" onClick={filterDay('Thur', this)}>Thur</button>
                        <button className="filter-chip" onClick={filterDay('Fri', this)}>Fri</button>
                        <div className="filter_divider"></div>
                        <span className="results-count" id="resultsCount">Showing 0 clubs</span>
                    </div>
                </div>

            </div>
        </main>
    );
}