import Image from "next/image";

import ResponsiveFilterPanel from "@/app/(public)/_components/ResponsiveFilterPanel";
import styles from "./gallery.module.css";

import GalleryFilterContent from "./_components/GalleryFilterContent";

export default function GalleryPage() {
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
            <div className="sticky-wrapper">
                <ResponsiveFilterPanel>
                    <GalleryFilterContent />
                </ResponsiveFilterPanel>
                <div className="category_container">
                    <div className="category-section" data-section="academic">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <i className="fas fa-book"></i> Academic
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="category-section" data-section="arts">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <i className="fas fa-palette"></i> Arts
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>


                    </div>
                    <div className="category-section" data-section="community">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <i className="fas fa-hands-helping"></i> Community
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="category-section" data-section="sports">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <i className="fas fa-running"></i> Sports &amp; Recreation
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="category-section" data-section="events">
                        <div className="category-header">
                            <div className="category-accent"></div>
                            <span className="category-title">
                                <i className="fas fa-calendar-check"></i> Events
                            </span>
                            <div className="category-divider"></div>
                            <span className="category-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.lightboxOverlay} id="lightbox">
                <button className="lightbox-nav-btn prev" title="Previous image" aria-label="Previous image"><i className="fas fa-chevron-left"></i></button>
                <button className="lightbox-nav-btn next" title="Next image" aria-label="Next image"><i className="fas fa-chevron-right"></i></button>
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
