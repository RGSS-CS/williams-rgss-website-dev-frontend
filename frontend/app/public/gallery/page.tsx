import Link from "next/link";

export default async function Page() {
    return (
        <main>
            <div className="hero">
                <div className="hero_shape"></div>
                <div className="hero_left">
                    <div className="hero_title">
                        <h1>Gallery</h1>
                    </div>
                    <div className="hero_subtitle">
                        <h5>Where photos tell our story.</h5>
                        <h5>Events, clubs, competitions, and everyday Wildcat moments.</h5>
                    </div>
                    <div className="search_container">
                        <i className="fas fa-search"></i>
                        <input className="search_input" id="gallery_search" type="text" placeholder="Search by club name, event, people..."></input>
                    </div>
                </div>
            </div>
        </main>
    );
}