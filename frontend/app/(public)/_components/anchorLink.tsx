"use client";

import { MouseEvent } from "react";

interface AnchorLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function AnchorLink({ href, children, className }: AnchorLinkProps) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const hashIndex = href.indexOf("#");
        const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
        const id = hash.slice(1);
        const target = document.getElementById(id);

        if (!hash || !target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", hash);
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
