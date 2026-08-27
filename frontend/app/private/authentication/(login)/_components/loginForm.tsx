"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightToBracket, faEnvelope, faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import { signin } from "@/app/private/authentication/_methods/auth";
import Capcha from "@/app/_components/captcha";
import type { Management } from "@/app/_lib/site-management";

type LoginFormProps = {
  management: Management;
  showCaptcha: boolean;
};

export default function LoginForm({ management, showCaptcha }: LoginFormProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className="authBody">
      <form action={signin}>
        <div className="authCard">
          <button type="button" className="authBackButton" onClick={handleBack} aria-label="Go back">
            <FontAwesomeIcon icon={faArrowLeft} className="authIcon" />
            Go Back
          </button>
          <div className="authCardHeader">
            <h1>Welcome {management.schoolMascot}</h1>
            <p>Sign in to access the {management.councilName} Dashboard</p>
          </div>
          <div className="authFieldGroup">
            <label htmlFor="student_number">School Email</label>
            <div className="authInputWrap">
              <FontAwesomeIcon icon={faEnvelope} className="authIcon" />
              <input id="student_number" name="student_number" type="email" placeholder="Student Number/Teacher Email" />
            </div>
          </div>
          <div className="authFieldGroup">
            <div>
              <label htmlFor="password">Password</label>
              <div className="authInputWrap">
                <FontAwesomeIcon icon={faKey} className="authIcon" />
                <input id="password" name="password" type={isVisible ? "text" : "password"} placeholder="Password" autoComplete="current-password" />
                <button type="button" className="authPasswordToggle" onClick={() => setIsVisible((current) => !current)} aria-label={isVisible ? "Hide password" : "Show password"} aria-pressed={isVisible}>
                  <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} className="authIcon" />
                </button>
              </div>
            </div>
          </div>
          {showCaptcha && <Capcha />}
          <button className="authSubmitButton" type="submit" id="loginBtn">
            <FontAwesomeIcon icon={faArrowRightToBracket} className="authSubmitIcon" />
            Continue
          </button>
          <div className="authSignupNote">
            <p><b>Don&apos;t have an account yet? </b></p>
            <h5>Sign up during the registration period. See announcements for more details.</h5>
          </div>
        </div>
      </form>
    </div>
  );
}
