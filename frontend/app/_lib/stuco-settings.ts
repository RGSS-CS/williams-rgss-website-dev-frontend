"use server";

import { cacheLife, cacheTag } from "next/cache";
import { toPublicMediaUrl } from "../_utils/media-url";

export type StucoSettingsApiRecord = {
    council_name: string;
    group_photo: string | null;
    photo_caption: string | null;
    stuco_logo: string | null;
};

export type StucoSettings = {
    councilName: string;
    groupPhoto: string | null;
    photoCaption: string | null;
    stucoLogo: string | null;
};

export type StucoAnnouncementApiRecord = {
    ticker_items: string | null;
};

export type StucoAnnouncement = {
    tickerItems: string[];
};

function getStucoSettingsApiUrl() {
    const apiBaseUrl = process.env.API_URL || "http://backend:8000";

    try {
        return new URL("/api/stuco/stuco-settings/?format=json", apiBaseUrl).toString();
    } catch {
        return null;
    };
};

function getStucoAnnouncementsApiUrl() {
    const apiBaseUrl = process.env.API_URL || "http://backend:8000";

    try {
        return new URL("/api/stuco/announcements/?format=json", apiBaseUrl).toString();
    } catch {
        return null;
    };
};

function normalizeStucoSettings(record: StucoSettingsApiRecord): StucoSettings {
    return {
        councilName: record.council_name,
        groupPhoto: record.group_photo === null ? null : toPublicMediaUrl(record.group_photo),
        photoCaption: record.photo_caption,
        stucoLogo: record.stuco_logo === null ? null : toPublicMediaUrl(record.stuco_logo),
    };
};

function normalizeStucoAnnouncement(record: StucoAnnouncementApiRecord): StucoAnnouncement {
    return {
        tickerItems: (record.ticker_items ?? "")
            .split(/\r\n|\n|\r/)
            .map((item) => item.trim())
            .filter(Boolean),
    };
};

export async function getStuco(): Promise<StucoSettings[]> {
    'use cache';
    cacheLife('hours');
    cacheTag('stuco-settings');
    const url = getStucoSettingsApiUrl();

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

        const settings = (await res.json()) as StucoSettingsApiRecord[];
        return settings.map(normalizeStucoSettings);
    } catch {
        return [];
    };
};

export async function getStucoSettings(): Promise<StucoSettings | null> {
    const settings = await getStuco();
    return settings[0] ?? null;
};

export async function getStucoAnnouncements(): Promise<StucoAnnouncement[]> {
    'use cache';
    cacheLife('hours');
    cacheTag('stuco-announcements');
    const url = getStucoAnnouncementsApiUrl();

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

        const announcements = (await res.json()) as StucoAnnouncementApiRecord[];
        return announcements.map(normalizeStucoAnnouncement);
    } catch {
        return [];
    };
};
