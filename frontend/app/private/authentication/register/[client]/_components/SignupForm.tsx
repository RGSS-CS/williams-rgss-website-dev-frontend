"use client";

import { useActionState, useState } from "react";
import styles from "@/app/private/authentication/styles.module.css";
import { signup, SignupState } from "@/app/private/authentication/_methods/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import StudentNumberField from "./studentNumberField";
import NameField from "./nameField";
import EmailField from "./emailField";
import PasswordField from "./passwordField";
import ConfirmPasswordField from "./confirmPasswordField";
import Capcha from "@/app/_components/captcha";

const initialState: SignupState = { error: null };

type SignupFormClientProps = {
    showCaptcha: boolean;
    code: string;
};

export default function SignupFormClient({ showCaptcha, code }: SignupFormClientProps) {
    const [state, formAction, isPending] = useActionState(signup, initialState);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

                <input type="hidden" name="code" value={code} />

                <NameField
                    firstName={firstName}
                    lastName={lastName}
                    onFirstNameChange={setFirstName}
                    onLastNameChange={setLastName}
                />
                <StudentNumberField value={studentNumber} onValueChange={setStudentNumber} />
                <EmailField value={email} onValueChange={setEmail} />
                <PasswordField value={password} onValueChange={setPassword} />
                <ConfirmPasswordField value={confirmPassword} onValueChange={setConfirmPassword} />
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