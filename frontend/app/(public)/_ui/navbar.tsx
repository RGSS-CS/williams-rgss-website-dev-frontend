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
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!navRef.current) return;
    const observer = new ResizeObserver(() => {
      const height = navRef.current!.offsetHeight;
      document.documentElement.style.setProperty("--navbar-height", `${height}px`);
    });
    observer.observe(navRef.current);
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
              <i className="fas fa-bars"></i>
            </button>
            <Link href="/" className="brand-link">
              <div className="logo">
                <Image src="/images/logo/logo.png" alt="School Logo" width={80} height={60} />
              </div>
              <div className="brand-copy">
                <h1 className="school-title">Dr. GW Williams S.S.</h1>
                <span className="school-subtitle">Student Council</span>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
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

      {/* Sidebar overlay + drawer */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`nav-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="sidebar-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActivePath(pathname, link.href) ? "active" : ""}
              onClick={() => setSidebarOpen(false)}
            >
              <i className={link.iconClass}></i>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
