import { redirect } from 'next/navigation';
import { getManagementSettings } from '@/app/_lib/site-management';
import { isCaptchaEnabledFor } from '@/app/_utils/checkCaptchaEnabled';
import RegisterGate from '@/app/private/authentication/register/_utils/verifyCode';
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

    const management = await getManagementSettings();

    return (
        <main className='registrationPage'>
            <div className='registrationShell'>
                <RegisterGate
                    code={code}
                    showCaptcha={isCaptchaEnabledFor(management, 'REGISTER')}
                    captchaEndpoint={process.env.CAPTCHA_URL}
                />
            </div>
        </main>
    );
}
