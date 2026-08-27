import { getManagementSettings } from "@/app/_lib/site-management";
import { isCaptchaEnabledFor } from "@/app/_utils/checkCaptchaEnabled";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import LoginForm from "./_components/loginForm";

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata("Authentication");
}

export default async function SigninPage() {
    const management = await getManagementSettings();
    if (!management) return null;

    return <LoginForm management={management} showCaptcha={isCaptchaEnabledFor(management, "LOGIN")} />;
}
