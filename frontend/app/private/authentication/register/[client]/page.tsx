import { Suspense } from 'react';
import styles from './register.module.css';
import loadingStyles from '@/app/private/authentication/styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getManagementSettings } from '@/app/_lib/site-management';
import { isCaptchaEnabledFor } from '@/app/_utils/checkCaptchaEnabled';
import RegisterGate from '@/app/private/authentication/_utils/registerGate';

type SignupFormProps = {
    params: Promise<{ client: string }>;
};

function SignupFormFallback() {
    return (
        <div className={loadingStyles.login_card} aria-busy="true" aria-label="Checking registration link">
            <span className={`${loadingStyles.loading_block} ${loadingStyles.loading_title}`}></span>
            <span className={`${loadingStyles.loading_block} ${loadingStyles.loading_subtitle}`}></span>
            <span className={`${loadingStyles.loading_block} ${loadingStyles.loading_field}`}></span>
            <span className={`${loadingStyles.loading_block} ${loadingStyles.loading_field}`}></span>
            <span className={`${loadingStyles.loading_block} ${loadingStyles.loading_field_last}`}></span>
            <span className={`${loadingStyles.loading_block} ${loadingStyles.loading_button}`}></span>
        </div>
    );
}

export default async function SignupForm({ params }: SignupFormProps) {
    const management = await getManagementSettings();

    return (
        <main>
            <div className={styles.container}>
                <div className={styles.register_brand_wrap}>
                    <Link href="/" className={styles.register_brand}>
                        <div className={styles.register_logo}>
                            <Image src="/images/logo/logo.png" alt="School logo" width={48} height={36} priority />
                        </div>
                        <div className={styles.register_brand_text}>
                            <span>{management?.schoolName ?? 'Student Council'}</span>
                            <small>{management?.councilName ?? 'Student Council'}</small>
                        </div>
                    </Link>
                </div>
                <Suspense fallback={<SignupFormFallback />}>
                    <RegisterGate params={params} showCaptcha={isCaptchaEnabledFor(management, "REGISTER")} />
                </Suspense>
            </div>
        </main>
    );
}
