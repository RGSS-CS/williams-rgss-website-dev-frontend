import Image from "next/image";
import ResponsiveFilterPanel from "@/app/(public)/_components/ResponsiveFilterPanel";
import styles from "./gallery.module.css";
import { Metadata } from 'next';
import GalleryFilterContent from "./_components/GalleryFilterContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//ICONS
import { faBook, faPalette, faHandsHelping, faRunning, faCalendarCheck, faImages, faSearch, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const metadata: Metadata = {
    title: "Gallery",
    description: "Where photos tell our story. Events, clubs, competitions, and everyday school moments.",
};

export default function GalleryPage() {
    return (
        <main>
            <div className="hero">
                <div className="hero_shape"></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className="hero_title">
                            <h1>Gallery</h1>
                        </div>
                        <div className="hero_subtitle">
                            <p>Where photos tell our story.</p>
                            <p>Events, clubs, competitions, and everyday school moments.</p>
                        </div>
                        <div className="search_container">
                            <FontAwesomeIcon icon={faSearch} className="search_container_icon"/>
                            <input className="search_input" id="gallery_search" type="text" placeholder="Search by club name, event, people..."></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky-wrapper">
                <ResponsiveFilterPanel>
                    <GalleryFilterContent />
                </ResponsiveFilterPanel>
                <div className="category_container">
                    <div className="category-section" data-section="academic">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <FontAwesomeIcon icon={faBook} /> Academic
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <FontAwesomeIcon icon={faImages} />
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="category-section" data-section="arts">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <FontAwesomeIcon icon={faPalette} /> Arts
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <FontAwesomeIcon icon={faImages} />
                                0 photos
                            </span>
                        </div>


                    </div>
                    <div className="category-section" data-section="community">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <FontAwesomeIcon icon={faHandsHelping} /> Community
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <FontAwesomeIcon icon={faImages} />
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="category-section" data-section="sports">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <FontAwesomeIcon icon={faRunning} /> Sports &amp; Recreation
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <FontAwesomeIcon icon={faImages} />
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="category-section" data-section="events">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <FontAwesomeIcon icon={faCalendarCheck} /> Events
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <FontAwesomeIcon icon={faImages} />
                                0 photos
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.lightboxOverlay} id="lightbox">
                <button className="lightbox-nav-btn prev" title="Previous image" aria-label="Previous image"><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button className="lightbox-nav-btn next" title="Next image" aria-label="Next image"><FontAwesomeIcon icon={faChevronRight} /></button>
                <div className={styles.lightboxInner}>
                    <div className={styles.lightboxImgContainer} id="lightboxImgWrap">
                        <Image
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                            alt=""
                            width={1}
                            height={1}
                            unoptimized
                        />
                    </div>
                    <div className="lightbox-meta">
                        <span className="lightbox-caption-text" id="lightboxCaption"></span>
                        <span className="lightbox-counter" id="lightboxCounter">0 / 0</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
