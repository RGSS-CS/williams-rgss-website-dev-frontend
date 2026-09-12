"use server";

import { cookies } from "next/headers";
import { toPublicMediaUrl } from "../_utils/media-url";

export type GalleryPhotoApiRecord = {
    name: string;
    description: string;
    image: string;
    created_date: string;
    modified_date: string;
    club: number;
    shown_in_gallery: boolean;
    shown_in_main_page: boolean;
};

export type GalleryPhoto = {
    name: string;
    description: string;
    image: string;
    createdDate: string;
    modifiedDate: string;
    club: number;
    shownInGallery: boolean;
    shownInMainPage: boolean;
};

function normalizeGalleryPhoto(record: GalleryPhotoApiRecord): GalleryPhoto {
    return {
        name: record.name,
        description: record.description,
        image: toPublicMediaUrl(record.image),
        createdDate: record.created_date,
        modifiedDate: record.modified_date,
        club: record.club,
        shownInGallery: record.shown_in_gallery,
        shownInMainPage: record.shown_in_main_page,
    };
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
    try {
        const apiBaseUrl = process.env.API_URL || "http://backend:8000";
        const url = new URL("/api/gallery/photos/", apiBaseUrl);
        const accessToken = (await cookies()).get("access_token")?.value;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return [];
        }

        const photos = (await res.json()) as GalleryPhotoApiRecord[];
        return photos.map(normalizeGalleryPhoto);
    } catch {
        return [];
    }
}
