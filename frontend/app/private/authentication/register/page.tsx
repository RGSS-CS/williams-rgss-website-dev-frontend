import { redirect } from 'next/navigation';
import { getManagementSettings } from '@/app/_lib/site-management';
import { isCaptchaEnabledFor } from '@/app/_utils/checkCaptchaEnabled';
import { verifyCode } from '@/app/private/authentication/register/_utils/verifyCode';
import SignupFormClient from './[api]/_components/signupForm';
import { decodeVerifiedRegistrationCode } from '@/app/_lib/registration-code';
export const instant = false;

type RegisterEntryProps = {
    searchParams: Promise<{ rel?: string }>;
};

export default async function RegisterRedirectClient({ searchParams }: RegisterEntryProps) {
    const { rel } = await searchParams;
    const code = decodeVerifiedRegistrationCode(rel);

    if (!code) {
        redirect('/private/authentication?error=missing_code');
    }

    const [management, isValid] = await Promise.all([
        getManagementSettings(),
        verifyCode(code),
    ]);

    if (!isValid) {
        redirect('/private/authentication?error=invalid_code');
    }

    return (
        <main className='authBody'>
            <SignupFormClient
                code={code}
                showCaptcha={isCaptchaEnabledFor(management, 'REGISTER')}
                captchaEndpoint={process.env.CAPTCHA_URL}
            />
        </main>
    );
}
