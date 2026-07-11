"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TickerBar from "@/app/(public)/_components/TickerBar";
import type { Management } from "@/app/_lib/management";
//ICONS
import { faBars, faTimes, faHome, faInfoCircle, faArrowRightToBracket, faUsers, faImages } from '@fortawesome/free-solid-svg-icons';

import styles from "./navigation.module.css";
import "@/app/(public)/styles.css";

type NavbarProps = {
  management: Management;
}


const links = [
  { href: "/", icon: <FontAwesomeIcon icon={faHome} />, label: "Home" },
  { href: "/clubs", icon: <FontAwesomeIcon icon={faUsers} />, label: "Clubs" },
  { href: "/gallery", icon: <FontAwesomeIcon icon={faImages} />, label: "Gallery" },
  { href: "/about", icon: <FontAwesomeIcon icon={faInfoCircle} />, label: "About" },
  {
    href: "/private/authentication",
    icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
    label: "Login",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ management }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className={styles.navbar_container}>
        <nav ref={navRef} className={styles.navbar}>
          <div className={styles.header_container}>
            <div className={styles.title_container}>
              <button
                className={styles.nav_hamburger}
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <Link href="/" className={styles.brand_link} prefetch={false}>
                <div className={styles.logo}>
                  <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
                </div>
                <div className={styles.brand_copy}>
                  <span className={styles.school_title}>{management.schoolName}</span>
                  <span className={styles.school_subtitle}>Student Council</span>
                </div>
              </Link>
            </div>

            <div className={styles.nav_links}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActivePath(pathname, link.href) ? styles.active : ""}
                  onClick={() => setSidebarOpen(false)}
                  prefetch={false}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        {pathname === "/" && <TickerBar />}
      </div>
      {sidebarOpen && <div className={styles.sidebar_overlay} onClick={() => setSidebarOpen(false)} />}
      <div className={`${styles.nav_sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <button
          className={styles.sidebar_close}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className={styles.sidebar_links}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActivePath(pathname, link.href) ? styles.active : ""}
              onClick={() => setSidebarOpen(false)}
              prefetch={false}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
