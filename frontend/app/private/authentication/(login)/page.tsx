import { getManagementSettings } from "@/app/_lib/site-management";
import { isCaptchaEnabledFor } from "@/app/_utils/checkCaptchaEnabled";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import LoginForm from "./_components/loginForm";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata("Authentication");
}

type SigninPageProps = {
    searchParams: Promise<{ error?: string }>;
};

const ERROR_MESSAGES: Record<string, string> = {
    invalid_code: "Invalid code",
    missing_code: "Invalid code",
};

export default async function SigninPage({ searchParams }: SigninPageProps) {
    const management = await getManagementSettings();
    if (!management) return null;

    const { error } = await searchParams;

    return (
        <LoginForm
            management={management}
            showCaptcha={isCaptchaEnabledFor(management, "LOGIN")}
            captchaEndpoint={process.env.CAPTCHA_URL}
            initialError={error ? (ERROR_MESSAGES[error] ?? null) : null}
        />
    );
}
