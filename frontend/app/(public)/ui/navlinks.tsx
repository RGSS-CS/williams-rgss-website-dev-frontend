"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/public', iconClass: 'fas fa-home', label: 'Home' },
  { href: '/public/clubs', iconClass: 'fas fa-users', label: 'Clubs' },
  { href: '/public/gallery', iconClass: 'fas fa-images', label: 'Gallery' },
  { href: '/public/about', iconClass: 'fas fa-info-circle', label: 'About' },
  { href: '/public/login', iconClass: 'fas fa-solid fa-arrow-right-to-bracket', label: 'Login'},
];

function isActivePath(pathname: string, href: string) {
  if (href === '/public') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="nav-links">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={isActivePath(pathname, link.href) ? 'active' : ''}
        >
          <i className={link.iconClass}></i>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
