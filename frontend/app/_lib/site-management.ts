"use server";

import { cacheLife, cacheTag } from "next/cache";

export type SchoolLocationApiRecord = {
    location: string;
    location_lat: number;
    location_lon: number;
    content_type: number;
    object_id: number;
};

export type SchoolLocation = {
    location: string;
    locationLat: number;
    locationLon: number;
    contentType: number;
    objectId: number;
};

export type CaptchaSurface = "LOGIN" | "REGISTER" | "ENTERING";

export type ManagementApiRecord = {
    maintainance_mode: boolean;
    school_name: string;
    council_name: string;
    school_email: string;
    school_phone: string;
    social_media: unknown[];
    cropped_favicon: string;
    cropped_site_image: string;
    stuco_image: string;
    about_stuco: string;
    about_school: string;
    school_location: SchoolLocationApiRecord[];
    school_mascot: string;
    school_primary_color: string;
    school_secondary_color: string;
    school_tertiary_color: string;
    captcha: CaptchaSurface[];
};

export type Management = {
    maintainanceMode: boolean;
    schoolName: string | null;
    councilName: string | null;
    schoolEmail: string | null;
    schoolPhone: string | null;
    socialMedia: unknown[] | null;
    croppedFavicon: string | null;
    croppedSiteImage: string | null;
    stucoImage: string | null;
    aboutStuco: string | null;
    aboutSchool: string | null;
    schoolLocation: SchoolLocation[] | null;
    schoolMascot: string | null;
    schoolPrimaryColor: string | null;
    schoolSecondaryColor: string | null;
    schoolTertiaryColor: string | null;
    captcha: CaptchaSurface[];
};

function getSiteManagementApiUrl() {
    const apiBaseUrl =
        process.env.API_URL ||
        "http://backend:8000";

  try {
    return new URL("/api/management/site-settings/?format=json", apiBaseUrl).toString();
  } catch {
    return null;
  };
};

function normalizeSchoolLocation(record: SchoolLocationApiRecord): SchoolLocation {
    return {
        location: record.location,
        locationLat: record.location_lat,
        locationLon: record.location_lon,
        contentType: record.content_type,
        objectId: record.object_id,
    };
};

function formatPhoneNumber(phone: string | null | undefined): string | null {
    if (!phone) {
        return null;
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
        return null;
    }

    const digits = trimmedPhone.replace(/\D/g, "");

    if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    if (digits.length === 11 && digits.startsWith("1")) {
        return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }

    if (digits.length === 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    return trimmedPhone;
}

function normalizeManagement(record: ManagementApiRecord): Management {
    return {
        maintainanceMode: record.maintainance_mode,
        schoolName: record.school_name ?? null,
        councilName: record.council_name ?? null,
        schoolEmail: record.school_email ?? null,
        schoolPhone: formatPhoneNumber(record.school_phone),
        socialMedia: record.social_media ?? null,
        croppedFavicon: record.cropped_favicon ?? null,
        croppedSiteImage: record.cropped_site_image ?? null,
        stucoImage: record.stuco_image ?? null,
        aboutStuco: record.about_stuco ?? null,
        aboutSchool: record.about_school ?? null,
        schoolLocation: record.school_location ? record.school_location.map(normalizeSchoolLocation) : null,
        schoolMascot: record.school_mascot ?? null,
        schoolPrimaryColor: record.school_primary_color ?? null,
        schoolSecondaryColor: record.school_secondary_color ?? null,
        schoolTertiaryColor: record.school_tertiary_color ?? null,
        captcha: record.captcha ?? [],
    };
};

export async function getManagement(): Promise<Management[]> {
    'use cache: remote';
    cacheLife('minutes');
    cacheTag('management');
    const url = getSiteManagementApiUrl();

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

        const management = (await res.json()) as ManagementApiRecord[];
        return management.map(normalizeManagement);
    } catch {
        return [];
    };
};

export async function getManagementSettings(): Promise<Management | null> {
    const management = await getManagement();
    return management[0] ?? null;
};