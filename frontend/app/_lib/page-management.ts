"use server";

import { cacheLife, cacheTag } from "next/cache";

export type PageManagementApiRecord = {
    internal_site_name: string;
    title: string;
    subtitle: string;
    tagline: string;
};

export type PageManagement = {
    internalSiteName: string;
    title: string;
    subtitle: string;
    tagline: string;
};

export type SitesApiResponse = PageManagementApiRecord[];
export type SitesResponse = PageManagement[];

function getPageManagementApiUrl() {
    const apiBaseUrl = process.env.API_URL || "http://backend:8000";

    try {
        return new URL("/management/page-settings/?format=json", apiBaseUrl).toString();
    } catch {
        return null;
    };
};

function normalizePageManagement(record: PageManagementApiRecord): PageManagement {
    return {
        internalSiteName: record.internal_site_name,
        title: record.title,
        subtitle: record.subtitle,
        tagline: record.tagline,
    };
};

export async function getPageManagement(): Promise<PageManagement[]> {
    'use cache: remote';
    cacheLife('minutes');
    cacheTag('management');
    const url = getPageManagementApiUrl();

    if (!url) {
        return [];
    };

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            return [];
        }

        const management = (await res.json()) as SitesApiResponse;
        return management.map(normalizePageManagement);
    } catch {
        return [];
    };
};

export async function getPageManagementSettings( 
    internalSiteName: string 
): Promise<PageManagement | null> {
    const management = await getPageManagement();
    return (
        management.find((page) => page.internalSiteName === internalSiteName) ?? null
    );
};
