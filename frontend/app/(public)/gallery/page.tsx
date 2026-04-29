"use client"

import Link from "next/link";
import { filterCategory } from "@/app/(public)/_utils/filterCategory";

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
                <div className="gallery_container">
                    <div className="gallery-section" data-section="academic">
                        <div className="section-header">
                            <div className="section-heading-group">
                                <div className="section-accent-bar"></div>
                                <div className="section-heading">
                                    <h2><i className="fas fa-book"></i> Academic</h2>
                                    <p>{/*List out clubs that are part of academic section*/}</p>
                                </div>
                            </div>
                            <span className="section-photo-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="gallery-section" data-section="arts">
                        <div className="section-header">
                            <div className="section-heading-group">
                                <div className="section-accent-bar"></div>
                                <div className="section-heading">
                                    <h2><i className="fas fa-palette"></i> Arts</h2>
                                    <p>{/*List out clubs that are part of academic section*/}</p>
                                </div>
                            </div>
                            <span className="section-photo-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="gallery-section" data-section="community">
                        <div className="section-header">
                            <div className="section-heading-group">
                                <div className="section-accent-bar"></div>
                                <div className="section-heading">
                                    <h2><i className="fas fa-hands-helping"></i> Community</h2>
                                    <p>{/*List out clubs that are part of community section*/}</p>
                                </div>
                            </div>
                            <span className="section-photo-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="gallery-section" data-section="sports">
                        <div className="section-header">
                            <div className="section-heading-group">
                                <div className="section-accent-bar"></div>
                                <div className="section-heading">
                                    <h2><i className="fas fa-running"></i> Sports &amp; Recreation</h2>
                                    <p>{/*List out teams that are part of sports section*/}</p>
                                </div>
                            </div>
                            <span className="section-photo-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

                    </div>
                    <div className="gallery-section" data-section="events">
                        <div className="section-header">
                            <div className="section-heading-group">
                                <div className="section-accent-bar"></div>
                                <div className="section-heading">
                                    <h2><i className="fas fa-calendar-check"></i> Events</h2>
                                    <p>{/*List out events that happened*/}</p>
                                </div>
                            </div>
                            <span className="section-photo-count">
                                <i className="fas fa-images"></i>
                                0 photos
                            </span>
                        </div>

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