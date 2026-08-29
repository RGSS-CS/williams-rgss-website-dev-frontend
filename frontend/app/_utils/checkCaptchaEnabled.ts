import type { CaptchaSurface, Management } from "@/app/_lib/site-management";

export function isCaptchaEnabledFor(
    management: Pick<Management, "captcha"> | null | undefined,
    surface: CaptchaSurface,
): boolean {
    return Boolean(management?.captcha?.includes(surface));
}