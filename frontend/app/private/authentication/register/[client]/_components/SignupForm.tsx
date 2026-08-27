"use client";

import { useActionState, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faEnvelope, faEye, faEyeSlash, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/private/authentication/styles.module.css";
import { signup, SignupState } from "@/app/private/authentication/_methods/auth";
import Capcha from "@/app/_components/captcha";

const initialState: SignupState = { error: null };

type SignupFormClientProps = {
  showCaptcha: boolean;
  code: string;
};

type FieldProps = {
  value: string;
  onChange: (value: string) => void;
};

function TextField({ id, label, placeholder, type = "text", autoComplete, value, onChange, icon }: FieldProps & {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "email";
  autoComplete: string;
  icon: typeof faUser;
}) {
  return (
    <div className={styles.form_group}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.input_wrap}>
        <FontAwesomeIcon icon={icon} className={styles.fas} />
        <input id={id} name={id} type={type} placeholder={placeholder} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.currentTarget.value)} />
      </div>
    </div>
  );
}

function PasswordField({ id, label, value, onChange }: FieldProps & { id: string; label: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.form_group}>
      <div>
        <label htmlFor={id}>{label}</label>
        <div className={styles.input_wrap}>
          <FontAwesomeIcon icon={faKey} className={styles.fas} />
          <input id={id} name={id} type={isVisible ? "text" : "password"} placeholder={label} autoComplete="current-password" value={value} onChange={(event) => onChange(event.currentTarget.value)} />
          <button className={styles.toggle_pw} type="button" onClick={() => setIsVisible((current) => !current)} aria-label={isVisible ? "Hide password" : "Show password"} aria-pressed={isVisible}>
            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} className={styles.fas} />
          </button>
        </div>
      </div>
    </div>
  );
}

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

        {state.error && <div className={styles.form_error} role="alert">{state.error}</div>}
        <input type="hidden" name="code" value={code} />

        <TextField id="first_name" label="Name" placeholder="First Name" autoComplete="given-name" value={firstName} onChange={setFirstName} icon={faUser} />
        <TextField id="last_name" label="" placeholder="Last Name" autoComplete="family-name" value={lastName} onChange={setLastName} icon={faUser} />
        <TextField id="student_number" label="Student Number" placeholder="Student Number" autoComplete="off" value={studentNumber} onChange={(value) => setStudentNumber(value.replace(/\D/g, ""))} icon={faEnvelope} />
        <TextField id="email" label="Email" type="email" placeholder="Email" autoComplete="email" value={email} onChange={setEmail} icon={faEnvelope} />
        <PasswordField id="password" label="Password" value={password} onChange={setPassword} />
        <PasswordField id="confirm_password" label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
        {showCaptcha && <Capcha />}

        <button className={styles.btn_login} type="submit" id="loginBtn" disabled={isPending}>
          <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.fas} />
          {isPending ? "Checking..." : "Continue"}
        </button>
      </div>
    </form>
  );
}
