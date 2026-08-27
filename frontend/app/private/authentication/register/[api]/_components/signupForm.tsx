"use client";
import { useActionState, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faEnvelope, faEye, faEyeSlash, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
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
    <div className="authFieldGroup">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="authInputWrap">
        <FontAwesomeIcon icon={icon} className="authIcon" />
        <input id={id} name={id} type={type} placeholder={placeholder} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.currentTarget.value)} />
      </div>
    </div>
  );
}

function PasswordField({ id, label, value, onChange }: FieldProps & { id: string; label: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="authFieldGroup">
      <div>
        <label htmlFor={id}>{label}</label>
        <div className="authInputWrap">
          <FontAwesomeIcon icon={faKey} className="authIcon" />
          <input id={id} name={id} type={isVisible ? "text" : "password"} placeholder={label} autoComplete="current-password" value={value} onChange={(event) => onChange(event.currentTarget.value)} />
          <button className="authPasswordToggle" type="button" onClick={() => setIsVisible((current) => !current)} aria-label={isVisible ? "Hide password" : "Show password"} aria-pressed={isVisible}>
            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} className="authIcon" />
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
      <div className="authCard">
        <div className="authCardHeader">
          <h1>Register Now</h1>
          <p>Sign up for easy access to all features</p>
        </div>

        {state.error && <div className="authFormError" role="alert">{state.error}</div>}
        <input type="hidden" name="code" value={code} />

        <TextField id="first_name" label="Name" placeholder="First Name" autoComplete="given-name" value={firstName} onChange={setFirstName} icon={faUser} />
        <TextField id="last_name" label="" placeholder="Last Name" autoComplete="family-name" value={lastName} onChange={setLastName} icon={faUser} />
        <TextField id="student_number" label="Student Number" placeholder="Student Number" autoComplete="off" value={studentNumber} onChange={(value) => setStudentNumber(value.replace(/\D/g, ""))} icon={faEnvelope} />
        <TextField id="email" label="Email (Student)" type="email" placeholder="Email" autoComplete="email" value={email} onChange={setEmail} icon={faEnvelope} />
        <span className="warning"><h4><strong>DO NOT USE YOUR SCHOOL PASSWORD</strong></h4></span>
        <PasswordField id="password" label="Password" value={password} onChange={setPassword} />
        <PasswordField id="confirm_password" label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
        {showCaptcha && <Capcha />}

        <button className="authSubmitButton" type="submit" id="loginBtn" disabled={isPending}>
          <FontAwesomeIcon icon={faArrowRightToBracket} className="authSubmitIcon" />
          {isPending ? "Checking..." : "Continue"}
        </button>
      </div>
    </form>
  );
}
