import { cacheLife } from "next/cache";
import { redirect } from "next/navigation";
import SignupFormClient from "@/app/private/authentication/register/[api]/_components/signupForm";
import { Suspense } from "react";

type RegisterGateProps = {
    code: string;
    showCaptcha: boolean;
    captchaEndpoint?: string;
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

export default async function RegisterGate({ code, showCaptcha, captchaEndpoint }: RegisterGateProps) {
    const isValid = await verifyCode(code);
    if (!isValid) {
        redirect("/private/authentication?error=invalid_code");
    }

    return <Suspense><SignupFormClient showCaptcha={showCaptcha} code={code} captchaEndpoint={captchaEndpoint} /></Suspense>;
}
