"use client";

import { useRef, useEffect, useState } from "react";
<<<<<<< HEAD:frontend/app/(public)/ui/navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/_modules/navbar.module.css";

const links = [
  { href: "/", iconClass: "fas fa-home", label: "Home" },
  { href: "/clubs", iconClass: "fas fa-users", label: "Clubs" },
  { href: "/gallery", iconClass: "fas fa-images", label: "Gallery" },
  { href: "/about", iconClass: "fas fa-info-circle", label: "About" },
  { href: "/login", iconClass: "fas fa-solid fa-arrow-right-to-bracket", label: "Login" },
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
=======
import Image from 'next/image';
import NavLinks from "./navlinks";
import "@/app/public/styles.css"

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
>>>>>>> c5c41b28c23724e6e32038367c4d206bdd5a429b:frontend/app/public/ui/navbar.tsx
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if(!navRef.current) return;

    const observer = new ResizeObserver(() => {
      const height = navRef.current!.offsetHeight;
      setNavHeight(height);
      document.documentElement.style.setProperty("--navbar-height",`${height}px`)
    });

  observer.observe(navRef.current);
  return () => observer.disconnect();
  }, []);
  
  return (
<<<<<<< HEAD:frontend/app/(public)/ui/navbar.tsx
    <nav ref={navRef} className={styles.navbar}>
          <div className={styles.headerContainer}>
            <a className={styles.titleContainer} href="/public">
              <div className={styles.logo}>
                <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
              </div>
              <div>
                <span className={styles.schoolTitle}><h1>Dr. GW Williams S.S.</h1></span>
                <span className={styles.schoolSubtitle}>Student Council</span>
              </div>
            </a>
            <div className={styles.navLinks}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActivePath(pathname, link.href) ? styles.active : ""}`.trim()}
                >
                  <i className={link.iconClass}></i>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
    </nav>
  );
}
=======
    <nav ref={navRef} className="navbar">
          <div className="header-container">
            <a className="title-container" href="/public">
              <div className="logo">
                <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
              </div>
              <div>
                <span className="school-title"><h1>Dr. GW Williams S.S.</h1></span>
                <span className="school-subtitle">Student Council</span>
              </div>
            </a>
            <NavLinks />
          </div>
    </nav>
  );
}
>>>>>>> c5c41b28c23724e6e32038367c4d206bdd5a429b:frontend/app/public/ui/navbar.tsx
