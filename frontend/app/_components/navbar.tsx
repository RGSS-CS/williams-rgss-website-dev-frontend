"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Management } from "@/app/_lib/site-management";
//ICONS
import { faBars, faTimes, faHome, faInfoCircle, faArrowRightToBracket, faUsers, faImages } from '@fortawesome/free-solid-svg-icons';

import styles from "@/app/(public)/_styles/base/navigation.module.css";

type NavbarProps = {
    management: Management | null;
}


const links = [
    { href: "/", icon: <FontAwesomeIcon icon={faHome} />, label: "Home" },
    { href: "/clubs", icon: <FontAwesomeIcon icon={faUsers} />, label: "Clubs" },
    { href: "/gallery", icon: <FontAwesomeIcon icon={faImages} />, label: "Gallery" },
    { href: "/about", icon: <FontAwesomeIcon icon={faInfoCircle} />, label: "About" },
    {
        href: "/private/authentication",
        icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
        label: "Login/Register",
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
            <div className={styles.navbarContainer}>
                <nav ref={navRef} className={styles.navbar}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <button
                                className={styles.navHamburger}
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Open menu"
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                            <Link href="/" className={styles.brandLink}>
                                <div className={styles.logo}>
                                    {management?.croppedSiteImage && (<Image src={management.croppedSiteImage} alt="School Logo" width={80} height={80} loading="eager" priority={true}/>)}
                                </div>
                                <div className={styles.brandCopy}>
                                    <span className={styles.schoolTitle}>{management?.schoolName}</span>
                                    <span className={styles.schoolSubtitle}>Student Council</span>
                                </div>
                            </Link>
                        </div>

                        <div className={styles.navLinks}>
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={styles.navLink}
                                    data-active={isActivePath(pathname, link.href)}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {link.icon}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
            {sidebarOpen && <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />}
            <div className={styles.navSidebar} data-open={sidebarOpen}>
                <button
                    className={styles.sidebarClose}
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close menu"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className={styles.sidebarLinks}>
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={styles.sidebarLink}
                            data-active={isActivePath(pathname, link.href)}
                            onClick={() => setSidebarOpen(false)}
                        >
                            {link.icon}
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
