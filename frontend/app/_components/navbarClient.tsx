"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightToBracket, faBars, faHome,
    faImages, faInfoCircle, faRightFromBracket,
    faTimes, faUsers
} from "@fortawesome/free-solid-svg-icons";
import type { Management } from "@/app/_lib/site-management";
import { signout } from "@/app/private/authentication/_methods/auth";
import styles from "./navbar.module.css";

type AuthUser = {
    username: string;
};

type NavbarClientProps = {
    management: Management | null;
    authUser: AuthUser | null;
};

const links = [
    { href: "/", icon: <FontAwesomeIcon icon={faHome} />, label: "Home" },
    { href: "/clubs", icon: <FontAwesomeIcon icon={faUsers} />, label: "Clubs" },
];

function isActivePath(pathname: string, href: string) {
    if (href === "/") {
        return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

async function handleSignout(formData: FormData) {
    const redirectPath = await signout(formData);
    window.location.assign(redirectPath);
}

function AuthNavItem({
    authUser,
    currentPath,
    onNavigate,
    variant = "desktop"
}: {
    authUser: AuthUser | null;
    currentPath: string;
    onNavigate: () => void;
    variant?: "desktop" | "sidebar";
}) {
    if (!authUser) {
        const className = variant === "sidebar" ? styles.sidebarLink : styles.navLink;

        return (
            <a
                href='/private/authentication'
                className={className}
                data-active={isActivePath(currentPath, "/private/authentication")}
                onClick={onNavigate}
            >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                Login/Register
            </a>
        );
    }
    return (
        <div className={variant === "sidebar" ? styles.sidebarAccount : styles.navAccount}>
            <span className={styles.accountUsername}>{authUser.username}</span>
            <form action={handleSignout}>
                <input type='hidden' name='currentPath' value={currentPath} />
                <button
                    type='submit'
                    className={styles.signOutButton}
                    aria-label='Sign out'
                    title='Sign out'
                    onClick={onNavigate}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </form>
        </div>
    );
}

export default function NavbarClient({ management, authUser }: NavbarClientProps) {
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
                                aria-label='Open menu'
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                            <Link href='/' className={styles.brandLink}>
                                <div className={styles.logo}>
                                    {management?.croppedSiteImage && (
                                        <img
                                            src={management.croppedSiteImage}
                                            alt='School Logo'
                                            width={80}
                                            height={80}
                                            loading='eager'
                                        />
                                    )}
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
                            <AuthNavItem
                                authUser={authUser}
                                currentPath={pathname}
                                onNavigate={() => setSidebarOpen(false)}
                            />
                        </div>
                    </div>
                </nav>
            </div>
            {sidebarOpen && (
                <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
            )}
            <div className={styles.navSidebar} data-open={sidebarOpen}>
                <button
                    className={styles.sidebarClose}
                    onClick={() => setSidebarOpen(false)}
                    aria-label='Close menu'
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
                    <AuthNavItem
                        authUser={authUser}
                        currentPath={pathname}
                        onNavigate={() => setSidebarOpen(false)}
                        variant='sidebar'
                    />
                </div>
            </div>
        </>
    );
}
