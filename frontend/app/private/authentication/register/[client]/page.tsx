import bodyStyles from './register.module.css';
import Image from 'next/image';
import { getManagementSettings } from '@/app/_lib/site-management';
import { isCaptchaEnabledFor } from '@/app/_utils/checkCaptchaEnabled';
import SignupFormClient from './_components/SignupForm';

export default async function SignupForm() {
    const management = await getManagementSettings();

    return (
        <main className={bodyStyles.page}>
            <div className={bodyStyles.body}>
                <div className={bodyStyles.register_brand_wrap}>
                    <a href="/" className={bodyStyles.register_brand}>
                        <div className={bodyStyles.register_logo}>
                            <Image src="/images/logo/logo.png" alt="School logo" width={48} height={36} priority />
                        </div>
                        <div className={bodyStyles.register_brand_text}>
                            <span>{management?.schoolName ?? 'Student Council'}</span>
                            <small>{management?.councilName ?? 'Student Council'}</small>
                        </div>
                    </a>
                </div>
                <SignupFormClient showCaptcha={isCaptchaEnabledFor(management, "REGISTER")} />
            </div>
        </main>
    );
}