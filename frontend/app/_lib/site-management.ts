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
    schoolName: string;
    councilName: string;
    schoolEmail: string;
    schoolPhone: string;
    socialMedia: unknown[];
    croppedFavicon: string;
    croppedSiteImage: string;
    stucoImage: string;
    aboutStuco: string;
    aboutSchool: string;
    schoolLocation: SchoolLocation[];
    schoolMascot: string;
    schoolPrimaryColor: string;
    schoolSecondaryColor: string;
    schoolTertiaryColor: string;
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

function formatPhoneNumber(phone: string): string {
    const trimmedPhone = phone.trim();

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
        schoolName: record.school_name,
        councilName: record.council_name,
        schoolEmail: record.school_email,
        schoolPhone: formatPhoneNumber(record.school_phone),
        socialMedia: record.social_media,
        croppedFavicon: record.cropped_favicon,
        croppedSiteImage: record.cropped_site_image,
        stucoImage: record.stuco_image,
        aboutStuco: record.about_stuco,
        aboutSchool: record.about_school,
        schoolLocation: record.school_location.map(normalizeSchoolLocation),
        schoolMascot: record.school_mascot,
        schoolPrimaryColor: record.school_primary_color,
        schoolSecondaryColor: record.school_secondary_color,
        schoolTertiaryColor: record.school_tertiary_color,
        captcha: record.captcha,
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