import Image from "next/image";
import ResponsiveFilterPanel from "@/app/(public)/_components/mobileFilterPanel";
import styles from "./gallery.module.css";
import catStyles from "@/app/(public)/_styles/sections/categories.module.css";
import { Metadata } from "next";
import GalleryFilterContent from "./_components/galleryFilterControls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { getPageManagementSettings } from "@/app/_lib/page-management";
import { Suspense } from "react";
import PublicHeroLoading from "@/app/(public)/_components/publicHeroLoading";

//ICONS
import {
  faBook,
  faPalette,
  faHandsHelping,
  faRunning,
  faCalendarCheck,
  faImages,
  faSearch,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Gallery");
}

async function GalleryHero() {
  const pageManagement = await getPageManagementSettings("GL");

  return (
    <div className='hero'>
      <div className='hero_shape'></div>
      <div className='hero_inner'>
        <div className='hero_left'>
          <div className='hero_title'>
            <h1>{pageManagement?.title}</h1>
            <h2>{pageManagement?.subtitle}</h2>
          </div>
          <div className='hero_subtitle'>
            <p>{pageManagement?.tagline}</p>
          </div>
          <div className='search_container'>
            <FontAwesomeIcon icon={faSearch} className='search_container_icon' />
            <input
              className='search_input'
              id='gallery_search'
              type='text'
              placeholder='Search by club name, event, people...'
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <main>
      <Suspense fallback={<PublicHeroLoading search titleLines={1} />}>
        <GalleryHero />
      </Suspense>
      <div className='sticky-wrapper'>
        <ResponsiveFilterPanel>
          <GalleryFilterContent />
        </ResponsiveFilterPanel>
        <div className={catStyles.categoryContainer}>
          <div className={catStyles.categorySection} data-section='academic'>
            <div className={catStyles.categoryHeader}>
              <div className={catStyles.categoryAccent}></div>
              <span className={catStyles.categoryTitle}>
                <FontAwesomeIcon icon={faBook} /> Academic
              </span>
              <div className={catStyles.categoryDivider}></div>
              <span className={catStyles.categoryCount}>
                <FontAwesomeIcon icon={faImages} />0 photos
              </span>
            </div>
          </div>
          <div className={catStyles.categorySection} data-section='arts'>
            <div className={catStyles.categoryHeader}>
              <div className={catStyles.categoryAccent}></div>
              <span className={catStyles.categoryTitle}>
                <FontAwesomeIcon icon={faPalette} /> Arts
              </span>
              <div className={catStyles.categoryDivider}></div>
              <span className={catStyles.categoryCount}>
                <FontAwesomeIcon icon={faImages} />0 photos
              </span>
            </div>
          </div>
          <div className={catStyles.categorySection} data-section='community'>
            <div className={catStyles.categoryHeader}>
              <div className={catStyles.categoryAccent}></div>
              <span className={catStyles.categoryTitle}>
                <FontAwesomeIcon icon={faHandsHelping} /> Community
              </span>
              <div className={catStyles.categoryDivider}></div>
              <span className={catStyles.categoryCount}>
                <FontAwesomeIcon icon={faImages} />0 photos
              </span>
            </div>
          </div>
          <div className={catStyles.categorySection} data-section='sports'>
            <div className={catStyles.categoryHeader}>
              <div className={catStyles.categoryAccent}></div>
              <span className={catStyles.categoryTitle}>
                <FontAwesomeIcon icon={faRunning} /> Sports &amp; Recreation
              </span>
              <div className={catStyles.categoryDivider}></div>
              <span className={catStyles.categoryCount}>
                <FontAwesomeIcon icon={faImages} />0 photos
              </span>
            </div>
          </div>
          <div className={catStyles.categorySection} data-section='events'>
            <div className={catStyles.categoryHeader}>
              <div className={catStyles.categoryAccent}></div>
              <span className={catStyles.categoryTitle}>
                <FontAwesomeIcon icon={faCalendarCheck} /> Events
              </span>
              <div className={catStyles.categoryDivider}></div>
              <span className={catStyles.categoryCount}>
                <FontAwesomeIcon icon={faImages} />0 photos
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lightboxOverlay} id='lightbox'>
        <button
          className='lightbox-nav-btn prev'
          title='Previous image'
          aria-label='Previous image'
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className='lightbox-nav-btn next' title='Next image' aria-label='Next image'>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className={styles.lightboxInner}>
          <div className={styles.lightboxImgContainer} id='lightboxImgWrap'>
            <Image
              src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
              alt=''
              width={1}
              height={1}
              unoptimized
            />
          </div>
          <div className='lightbox-meta'>
            <span className='lightbox-caption-text' id='lightboxCaption'></span>
            <span className='lightbox-counter' id='lightboxCounter'>
              0 / 0
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
