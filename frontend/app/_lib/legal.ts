"use server";

import { cacheLife, cacheTag } from "next/cache";

export type LegalApiRecord = {
    terms_service: string;
    privacy_policy: string;
    last_updated: string;
};

export type LegalDocuments = {
    termsService: string;
    privacyPolicy: string;
    lastUpdated: string;
};

function getLegalApiUrl() {
    const apiBaseUrl = process.env.API_URL || "http://backend:8000";

    try {
        return new URL("/api/management/legal/?format=json", apiBaseUrl).toString();
    } catch {
        return null;
    }
}

function normalizeLegal(record: LegalApiRecord): LegalDocuments {
    return {
        termsService: record.terms_service,
        privacyPolicy: record.privacy_policy,
        lastUpdated: record.last_updated
    };
}

export async function getLegalDocuments(): Promise<LegalDocuments | null> {
    'use cache';
    cacheLife('hours');
    cacheTag('legal');

    const url = getLegalApiUrl();
    if (!url) return null;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            signal: AbortSignal.timeout(5000)
        });

        if (!res.ok) return null;

        const legal = (await res.json()) as LegalApiRecord[];
        const record = legal[0];
        return record ? normalizeLegal(record) : null;
    } catch {
        return null;
    }
}
