import { signin } from "@/app/private/authentication/_methods/auth";
import styles from "@/app/private/authentication/styles.module.css";
import LoginBackButton from "./_components/LoginBackButton";
import { getManagementSettings } from "@/app/_lib/site-management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PasswordField from "@/app/private/authentication/(login)/_components/PasswordField";
import StudentNumberField from "@/app/private/authentication/(login)/_components/StudentNumberField";

//ICONS
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata("Authentication");
}

export default async function SigninForm() {
    const management = await getManagementSettings();
    if (!management) return null;

    return (
        <>
            <div className={styles.body}>
                <form action={signin}>
                    <div className={styles.login_card}>
                        <LoginBackButton />
                        <div className={styles.card_header}>
                            <h1>Welcome {management.schoolMascot}</h1>
                            <p>Sign in to access the {management.councilName} Dashboard</p>
                        </div>
                        <StudentNumberField />

                        <PasswordField />

                        <button className={styles.btn_login} type="submit" id="loginBtn">
                            <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
                            Continue
                        </button>
                        <div className={styles.signUp}>
                            <p>
                                <b>Don&apos;t have an account yet?{" "}</b>
                            </p>
                            <h5>
                                Sign up during the registration period. Contact the {management.councilName} for more information.
                            </h5>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
