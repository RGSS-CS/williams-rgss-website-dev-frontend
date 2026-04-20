"use client";

import { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import NavLinks from "./NavLinks";

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
    <nav ref={navRef} className="navbar">
          <div className="header-container">
            <div className="title-container">
              <div className="logo">
                <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
              </div>
              <div className="title-title">
                <span id="school-title"><h1>Dr. GW Williams S.S.</h1></span>
                <span id="school-subtitle">Student Council</span>
              </div>
            </div>
            <NavLinks />
          </div>
    </nav>
  );
}