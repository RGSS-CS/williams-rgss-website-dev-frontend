"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "@/app/(public)/styles.css";

const links = [
  { href: "/", iconClass: "fas fa-home", label: "Home" },
  { href: "/clubs", iconClass: "fas fa-users", label: "Clubs" },
  { href: "/gallery", iconClass: "fas fa-images", label: "Gallery" },
  { href: "/about", iconClass: "fas fa-info-circle", label: "About" },
  {
    href: "/private/authentication",
    iconClass: "fas fa-solid fa-arrow-right-to-bracket",
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
  const [navHeight, setNavHeight] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver(() => {
      const height = navRef.current!.offsetHeight;
      setNavHeight(height);
      document.documentElement.style.setProperty("--navbar-height", `${height}px`);
    });

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="header-container">
        <a className="title-container" href="/">
          <div className="logo">
            <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
          </div>
          <div>
            <span className="school-title"><h1>Dr. GW Williams S.S.</h1></span>
            <span className="school-subtitle">Student Council</span>
          </div>
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActivePath(pathname, link.href) ? "active" : ""}
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
