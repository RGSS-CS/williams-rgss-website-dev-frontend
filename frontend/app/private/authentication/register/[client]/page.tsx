import styles from '@/app/private/authentication/styles.module.css';
import bodyStyles from './register.module.css';
import { signup } from "@/app/private/authentication/_methods/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import StudentNumberField from './_components/StudentNumberField';
import NameField from './_components/NameField';
import PasswordField from './_components/PasswordField';
import ConfirmPasswordField from './_components/ConfirmPasswordField';
import Image from 'next/image';
import { getManagementSettings } from '@/app/_lib/site-management';
import { isCaptchaEnabledFor } from '@/app/_utils/checkCaptchaEnabled';
import Capcha from '@/app/_components/captcha';

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
                <form action={signup}>
                    <div className={styles.login_card}>
                        <div className={styles.card_header}>
                            <h1>Register Now</h1>
                            <p>Sign up for easy access to all features</p>
                        </div>

                        <NameField />
                        <StudentNumberField />
                        <PasswordField />
                        <ConfirmPasswordField />
                        {isCaptchaEnabledFor(management, "REGISTER") && <Capcha />}

                        <button className={styles.btn_login} type="submit" id="loginBtn">
                            <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}