import Link from "next/link";
import Image from "next/image";
import { getSchoolYear } from "@/app/(public)/_utils/SchoolYear"
// import { Club } from "@/types/club";

//async function getDjangoAPI(): Promise<Club[]> {
//    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/clubs', {
//        cache: "no-store",
//    });

//    if (!res.ok) throw new Error("Failed to fetch clubs");
//    return res.json();
//}


export default async function Page() {
    //const clubs = await getDjangoAPI();
    return (
        <main>
            <div className="ticker_bar">
                <div className="ticker_header">
                    <h4><i className="fas fa-star"></i> Updates</h4>
                </div>

                <div className="ticker_track">
                    <div className="ticker_inner" id="ticker-inner">
                    </div>
                </div>
            </div>
            <div className="hero">
                <div className="hero_shape"></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className="hero_tag">
                            <h4>Student Council {getSchoolYear()}</h4>
                        </div>
                        <div className="hero_title">
                            <h1>GW. Williams</h1>
                            <h2>STUCO</h2>
                        </div>
                        <div className="hero_subtitle">
                            <h5>Representing Student Voice.</h5>
                            <h5>Building Wildcat Spirit.</h5>
                        </div>
                        <div className="hero_buttons">
                            <div className="hero_btn_primary">
                                <Link href="/public/clubs" className="hero_btn_text">
                                    <i className="fas fa-paper-plane"></i> Our Clubs
                                </Link>
                            </div>
                            <div className="hero_btn_secondary">
                                <a className="hero_btn_text_alt" href="#events">
                                    <i className="fas fa-calendar-alt fas_fa_calendar_alt"></i> Upcoming Events
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hero_badge_image">
                        <Image src="/images/logo/wildcat-icon.png" alt="Wildcat Icon" width={230} height={200} />
                    </div>
                </div>
                <div className="hero_photo_strip">
                    {/* Add photos here after database is set up */}
                </div>
            </div>
            <div className="section_wrap announcements_section">
                <div className="section_content">
                    <div className="section_title_row">
                        <h2 className="section_title">
                            <span className="section_title_accent"></span>
                            Announcements
                        </h2>
                    </div>
                    <div className="card_container">
                        <div className="card_row">
                            {/* Put Announcement cards here after database is set up */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="section_wrap events_section" id="events">
                <div className="section_title">
                    <span className="section_title_accent"></span>
                    <h2 className="section_title">Events</h2>
                </div>
                {/*Add calendar page*/}
            </div>
            <div className="section_wrap council_section">
                <div className="section_content">
                    <div className="section_title_row">
                        <h2 className="section_title">
                            <span className="section_title_accent"></span>
                            Meet the Council
                        </h2>
                    </div>
                    <div className="card_container">
                        <div className="card_row">
                            {/*Add section for school council*/}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
