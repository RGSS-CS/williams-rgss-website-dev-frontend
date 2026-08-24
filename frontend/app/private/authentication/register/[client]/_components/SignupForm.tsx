"use client";

import { useActionState } from "react";
import styles from "@/app/private/authentication/styles.module.css";
import { signup, SignupState } from "@/app/private/authentication/_methods/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import StudentNumberField from "./StudentNumberField";
import NameField from "./NameField";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";
import Capcha from "@/app/_components/captcha";

const initialState: SignupState = { error: null };

type SignupFormClientProps = {
    showCaptcha: boolean;
};

export default function SignupFormClient({ showCaptcha }: SignupFormClientProps) {
    const [state, formAction, isPending] = useActionState(signup, initialState);

    return (
        <form action={formAction}>
            <div className={styles.login_card}>
                <div className={styles.card_header}>
                    <h1>Register Now</h1>
                    <p>Sign up for easy access to all features</p>
                </div>

                {state.error && (
                    <div className={styles.form_error} role="alert">
                        {state.error}
                    </div>
                )}

                <NameField />
                <StudentNumberField />
                <PasswordField />
                <ConfirmPasswordField />
                {showCaptcha && <Capcha />}

                <button
                    className={styles.btn_login}
                    type="submit"
                    id="loginBtn"
                    disabled={isPending}
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
                    {isPending ? "Checking..." : "Continue"}
                </button>
            </div>
        </form>
    );
}