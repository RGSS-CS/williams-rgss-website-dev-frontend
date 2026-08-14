"use server";

import { cookies } from "next/headers";

const ENTRY_COOKIE_NAME = "site_entered";
const ENTRY_COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours — re-verify once per "session"

function getVerifyCaptchaApiUrl() {
    const apiBaseUrl = process.env.API_URL || "http://backend:8000";

    try {
        return new URL("/api/management/verify-captcha/", apiBaseUrl).toString();
    } catch {
        return null;
    }
}

export async function hasEnteredSite(): Promise<boolean> {
    const cookieStore = await cookies();
    return cookieStore.get(ENTRY_COOKIE_NAME)?.value === "1";
}

export async function verifyEntryCaptcha(
    token: string,
): Promise<{ success: boolean; error?: string }> {
    if (!token) {
        return { success: false, error: "Missing captcha token." };
    }

    const url = getVerifyCaptchaApiUrl();
    if (!url) {
        return { success: false, error: "Captcha verification is unavailable." };
    }

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, surface: "ENTERING" }),
            cache: "no-store",
        });

        if (!res.ok) {
            return { success: false, error: "Captcha verification failed." };
        }

        const cookieStore = await cookies();
        cookieStore.set(ENTRY_COOKIE_NAME, "1", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: ENTRY_COOKIE_MAX_AGE,
        });

        return { success: true };
    } catch {
        return { success: false, error: "Could not reach the captcha service." };
    }
}