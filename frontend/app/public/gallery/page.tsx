"use client"

import Link from "next/link";
import { filterCategory } from "@/utils/filterCategory";

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
                <div className="filter_bar_container">
                    <div className="filter_bar">
                        <span className="filter_label">
                            <i className="fas fa-filter"></i>
                            Filter
                        </span>
                        <button className="filter-chip active gold" onClick={(e) => filterCategory('all', e.currentTarget)}>All Clubs</button>
                        <button className="filter-chip" onClick={(e) => filterCategory('academic', e.currentTarget)}>
                            <i className="fas fa-book"></i>
                            Academic
                        </button>
                        <button className="filter-chip" onClick={(e) => filterCategory('arts', e.currentTarget)}>
                            <i className="fas fa-palette"></i>
                            Arts
                        </button>
                        <button className="filter-chip" onClick={(e) => filterCategory('community', e.currentTarget)}>
                            <i className="fas fa-hands-helping"></i>
                            Community
                        </button>
                        <button className="filter-chip" onClick={(e) => filterCategory('sports', e.currentTarget)}>
                            <i className="fas fa-running"></i>
                            Sports &amp; Rec
                        </button>
                        <button className="filter-chip" onClick={(e) => filterCategory('events', e.currentTarget)}>
                            <i className="fas fa-running"></i>
                            School Events
                        </button>
                        {/*Fix Server/Client components, refer: https://nextjs.org/docs/app/getting-started/server-and-client-components */}
                    </div>
                </div>
                <div className="grid_container" id="gallery_container">
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
                        <div className="category-grid"></div>
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
                        <div className="category-grid"></div>
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
                        <div className="category-grid"></div>
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
                        <div className="category-grid"></div>
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
                        <div className="category-grid"></div>
                    </div>
                </div>
            </div>
            <div className="lightbox-overlay" id="lightbox">
                <button className="lightbox-nav-btn prev"><i className="fas fa-chevron-left"></i></button>
                <button className="lightbox-nav-btn next"><i className="fas fa-chevron-right"></i></button>
                <div className="lightbox-inner">
                    <div className="lightbox-img-container" id="lightboxImgWrap">
                        <img src="null" alt=""></img>
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