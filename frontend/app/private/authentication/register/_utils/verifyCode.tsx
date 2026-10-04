import { cacheLife } from "next/cache";

function getApiBaseUrl(): string {
    return process.env.API_URL || "http://backend:8000";
}

export async function verifyCode(code: string): Promise<boolean> {
    "use cache";
    cacheLife("hours");

    if (!code.trim()) {
        return false;
    }

    try {
        const res = await fetch(new URL("/api/register/verify/", getApiBaseUrl()), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });

        return res.ok;
    } catch {
        return false;
    }
}
