"use client";

import { MouseEvent } from "react";

interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnchorLink({ href, children, className }: AnchorLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const id = href.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}