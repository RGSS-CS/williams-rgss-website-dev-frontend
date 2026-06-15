import { getClubs } from "@/app/_lib/club";

import ClubsDirectory from "./_components/ClubsDirectory";

export const dynamic = "force-dynamic";

function slugifyCategory(category: string) {
    return category
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatDayChip(day: string | null) {
    const normalized = day?.slice(0, 3).toLowerCase();
    const map: Record<string, string> = {
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
    };

    return normalized ? map[normalized] ?? "All Days" : "All Days";
}

function matchesQuery(club: any, query: string) {
    const searchable = [
        club.name,
        club.preview_description,
        club.description,
        club.teacherAdvisor ?? "",
        club.roomNumber ?? "",
        club.dayOfMeeting ?? "",
        club.time ?? "",
        club.repetition ?? "",
        club.categories.join(" "),
    ]
        .join(" ")
        .toLowerCase();

    return searchable.includes(query.toLowerCase());
}

export default async function ClubsPage({ searchParams }: { searchParams?: { query?: string; category?: string; day?: string } }) {
    const clubs = await getClubs();

    const query = searchParams?.query ?? "";
    const activeCategory = searchParams?.category ?? "all";
    const activeDay = searchParams?.day ?? "All Days";

    const categories = Array.from(
        new Set(clubs.flatMap((club) => club.categories).filter(Boolean)),
    ).sort((left, right) => left.localeCompare(right));

    const filteredClubs = clubs.filter((club) => {
        const clubCategorySlugs = club.categories.map(slugifyCategory);
        const matchesCategory =
            activeCategory === "all" || clubCategorySlugs.includes(activeCategory);
        const matchesDayFilter =
            activeDay === "All Days" || formatDayChip(club.dayOfMeeting) === activeDay;

        return (
            matchesCategory &&
            matchesDayFilter &&
            matchesQuery(club, query.trim())
        );
    });

    const visibleCategories = categories
        .filter((category) => {
            if (activeCategory === "all") {
                return true;
            }

            return slugifyCategory(category) === activeCategory;
        })
        .map((category) => ({
            name: category,
            slug: slugifyCategory(category),
            clubs: filteredClubs.filter((club) => club.categories.includes(category)),
        }))
        .filter((section) => section.clubs.length > 0);

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
                        <form className="search_container" method="get" action="/clubs">
                            <i className="fas fa-search"></i>
                            <input name="query" className="search_input" defaultValue={query} placeholder="Search clubs, teachers, rooms..." />
                            <button type="submit" className="search_submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="sticky-wrapper">
                <div className="filters_panel">
                    <form method="get" action="/clubs" className="filters_form">
                        <input name="query" type="hidden" value={query} />
                        <label>
                            Category
                            <select name="category" defaultValue={activeCategory}>
                                <option value="all">All Clubs</option>
                                {categories.map((c) => (
                                    <option key={c} value={slugifyCategory(c)}>{c}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Day
                            <select name="day" defaultValue={activeDay}>
                                <option value="All Days">All Days</option>
                                <option value="Mon">Mon</option>
                                <option value="Tue">Tue</option>
                                <option value="Wed">Wed</option>
                                <option value="Thu">Thu</option>
                                <option value="Fri">Fri</option>
                            </select>
                        </label>
                        <div className="filters_actions">
                            <button type="submit">Apply</button>
                            <a href="/clubs" className="reset_link">Reset</a>
                        </div>
                    </form>

                    <span className={`results-count ${""}`}>
                        Showing {filteredClubs.length} club{filteredClubs.length === 1 ? "" : "s"}
                    </span>
                </div>

                <div className={""}>
                    <span className={`results-count results-count-mobile ${""} ${""}`}>
                        Showing {filteredClubs.length} club{filteredClubs.length === 1 ? "" : "s"}
                    </span>
                </div>

                <ClubsDirectory visibleCategories={visibleCategories} />
            </div>

            <div className={""}>
                <h2>Don&apos;t See Your Club? <span>Start One.</span></h2>
                <p>Any GW Williams student can start a new club. Talk to a teacher that is interested with your idea.</p>
            </div>
        </main>
    );
}
