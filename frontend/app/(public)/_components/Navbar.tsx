"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//ICONS
import { faBars, faTimes, faHome, faInfoCircle, faArrowRightToBracket, faUsers, faImages } from '@fortawesome/free-solid-svg-icons';

import "@/app/(public)/styles.css";

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

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) {
      return;
    }

    const updateNavbarHeight = () => {
      const height = navElement.offsetHeight;
      document.documentElement.style.setProperty("--navbar-height", `${height}px`);
    };

    updateNavbarHeight();

    const observer = new ResizeObserver(updateNavbarHeight);
    observer.observe(navElement);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav ref={navRef} className="navbar">
        <div className="header-container">
          <div className="title-container">
            <button
              className="nav-hamburger"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <Link href="/" className="brand-link" prefetch={false}>
              <div className="logo">
                <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
              </div>
              <div className="brand-copy">
                <span className="school-title">Dr. GW Williams S.S.</span>
                <span className="school-subtitle">Student Council</span>
              </div>
            </Link>
          </div>

          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActivePath(pathname, link.href) ? "active" : ""}
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

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className={`nav-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="sidebar-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActivePath(pathname, link.href) ? "active" : ""}
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
