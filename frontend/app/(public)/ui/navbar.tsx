"use client";

import { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import NavLinks from "./navlinks";
import styles from "@/app/_modules/navbar.module.css";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
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
            <NavLinks />
          </div>
    </nav>
  );
}
