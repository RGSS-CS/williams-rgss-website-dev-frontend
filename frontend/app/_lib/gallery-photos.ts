"use server";

import { cacheLife, cacheTag } from "next/cache";
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

function getGalleryPhotosApiUrl() {
    const apiBaseUrl =
        process.env.API_URL ||
        "http://backend:8000";

    try {
        return new URL("/api/gallery/photos/?format=json", apiBaseUrl).toString();
    } catch {
        return null;
    };
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
};

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
    'use cache';
    cacheLife('hours');
    cacheTag('gallery-photos');
    const url = getGalleryPhotosApiUrl();

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

        const photos = (await res.json()) as GalleryPhotoApiRecord[];
        return photos.map(normalizeGalleryPhoto);
    } catch {
        return [];
    };
};
