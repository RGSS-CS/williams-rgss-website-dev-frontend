"use server";

import { cookies } from "next/headers";
import { toPublicMediaUrl } from "./media-url";

export type Photo = {
    id: number;
    title: string;
    image: string;
    caption: string;
    date_added: string;
};

export type Gallery = {
    id: number;
    title: string;
    description: string;
    date_added: string;
    photos: Photo[];
};

export type WhyJoinReasonApiRecord = {
    title: string;
    description: string;
    index: number;
};

export type WhyJoinReason = {
    title: string;
    description: string;
    index: number;
};

export type ClubApiRecord = {
    id: number;
    name: string;
    preview_description: string;
    description: string;
    tagline: string | null;
    category: string[];
    day_of_meeting: string;
    time: string;
    repetition: string;
    room_number: number;
    classroom_code: string | null;
    teacher_advisor: string;
    application_form_link: string | null;
    accepting_applicants: string;
    join_instructions: string;
    why_join: WhyJoinReasonApiRecord[] | null;
    gallery: Gallery | null;
};

export type Club = {
    id: number;
    name: string;
    preview_description: string;
    description: string;
    tagline: string;
    categories: string[];
    dayOfMeeting: string;
    time: string;
    repetition: string;
    roomNumber: string;
    classroomCode: string;
    teacherAdvisor: string;
    applicationFormLink: string;
    acceptingApplicants: string;
    joinInstructions: string;
    whyJoin: WhyJoinReason[];
    gallery: Gallery | null;
};

function getClubsApiUrl() {
    const apiBaseUrl =
        process.env.API_URL ||
        "http://backend:8000";

    try {
        return new URL("/api/club/?format=json", apiBaseUrl).toString();
    } catch {
        return null;
    };
};

function formatTimeTo12Hour(time: string | null | undefined): string | null {
    if (!time) {
        return null;
    };

    const trimmedTime = time.trim();
    if (!trimmedTime) {
        return null;
    };

    if (/am|pm/i.test(trimmedTime)) {
        return trimmedTime;
    };

    const match = trimmedTime.match(/^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?$/);
    if (!match) {
        return trimmedTime;
    };

    const hours = Number(match[1]);
    const minutes = match[2] ? Number(match[2]) : 0;
    const suffix = hours >= 12 ? "PM" : "AM";
    const normalizedHours = hours % 12 === 0 ? 12 : hours % 12;
    const minuteString = minutes.toString().padStart(2, "0");

    return `${normalizedHours}:${minuteString} ${suffix}`;
};

function formatAcceptingApplicants(acceptingApplicants: string): string {
    if (acceptingApplicants === "AC") {
        return "Apply Now";
    } else if (acceptingApplicants === "WA") {
        return "Applications closed";
    }
    return "Open to all";
};

function normalizeWhyJoin(whyJoin: WhyJoinReasonApiRecord[] | null | undefined): WhyJoinReason[] {
    if (!whyJoin) {
        return [];
    };

    return [...whyJoin]
        .filter((reason) => reason?.title?.trim())
        .sort((a, b) => a.index - b.index)
        .map((reason) => ({
            title: reason.title,
            description: reason.description,
            index: reason.index,
        }));
};

function normalizeGallery(gallery: Gallery | null): Gallery | null {
    if (!gallery) {
        return null;
    }

    return {
        ...gallery,
        photos: gallery.photos.map((photo) => ({
            ...photo,
            image: toPublicMediaUrl(photo.image),
        })),
    };
}

function normalizeClub(record: ClubApiRecord): Club {
    return {
        id: record.id,
        name: record.name,
        preview_description: record.preview_description,
        description: record.description,
        tagline: record.tagline ?? '',
        categories: record.category ?? [],
        dayOfMeeting: record.day_of_meeting,
        time: formatTimeTo12Hour(record.time) ?? '',
        repetition: record.repetition,
        roomNumber: String(record.room_number),
        classroomCode: record.classroom_code ?? '',
        teacherAdvisor: record.teacher_advisor,
        applicationFormLink: record.application_form_link ?? '',
        acceptingApplicants: formatAcceptingApplicants(record.accepting_applicants),
        joinInstructions: record.join_instructions,
        whyJoin: normalizeWhyJoin(record.why_join),
        gallery: normalizeGallery(record.gallery),
    };
};

export async function getClubs(): Promise<Club[]> {
    const url = getClubsApiUrl();
    if (!url) {
        return [];
    };

    try {
        const accessToken = (await cookies()).get("access_token")?.value;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return [];
        };

        const clubs = (await res.json()) as ClubApiRecord[];
        return clubs.map(normalizeClub);
    } catch {
        return [];
    };
};

export async function getClubById(id: number): Promise<Club | null> {
    const clubs = await getClubs();
    return clubs.find((club) => club.id === id) ?? null;
};
