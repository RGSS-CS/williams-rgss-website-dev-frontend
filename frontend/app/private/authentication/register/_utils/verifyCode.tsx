import { redirect } from "next/navigation";
import { cacheLife } from "next/cache";
import SignupFormClient from "@/app/private/authentication/register/[api]/_components/signupForm";
import { Suspense } from "react";

type RegisterGateProps = {
    params: Promise<{ api: string }>;
    showCaptcha: boolean;
};

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

export default async function RegisterGate({ params, showCaptcha }: RegisterGateProps) {
    const { api } = await params;
    const code = decodeURIComponent(api);

    const isValid = await verifyCode(code);
    if (!isValid) {
        redirect("/private/authentication?error=invalid_code");
    }

    return (<Suspense><SignupFormClient showCaptcha={showCaptcha} code={code} /></Suspense>)
        ;
}
