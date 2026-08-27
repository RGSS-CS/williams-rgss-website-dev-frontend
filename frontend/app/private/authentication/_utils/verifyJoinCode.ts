function getApiBaseUrl(): string {
    return process.env.API_URL || "http://backend:8000";
}

export async function verifyJoinCode(code: string): Promise<boolean> {
    if (!code.trim()) {
        return false;
    }

    try {
        const res = await fetch(new URL("/api/register/verify/", getApiBaseUrl()), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
            cache: "no-store",
        });

        return res.ok;
    } catch {
        return false;
    }
}