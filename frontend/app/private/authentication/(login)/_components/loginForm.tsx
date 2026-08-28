"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightToBracket,
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { signin } from "@/app/private/authentication/_methods/auth";
import Captcha from "@/app/_components/captcha";
import type { Management } from "@/app/_lib/site-management";

type LoginFormProps = {
  management: Management;
  showCaptcha: boolean;
  initialError?: string | null;
};

export default function LoginForm({
  management,
  showCaptcha,
  initialError = null,
}: LoginFormProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [state, formAction, isPending] = useActionState(signin, { error: initialError });

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className='authBody'>
      <form action={formAction}>
        <div className='authCard'>
          <button
            type='button'
            className='authBackButton'
            onClick={handleBack}
            aria-label='Go back'
          >
            <FontAwesomeIcon icon={faArrowLeft} className='authIcon' />
            Go Back
          </button>
          <div className='authCardHeader'>
            <h1>Welcome {management.schoolMascot}</h1>
            <p>Sign in to access the {management.councilName} Dashboard</p>
          </div>
          {state.error && (
            <div className='authFormError' role='alert'>
              {state.error}
            </div>
          )}
          <div className='authFieldGroup'>
            <label htmlFor='email'>School Email</label>
            <div className='authInputWrap'>
              <FontAwesomeIcon icon={faEnvelope} className='authIcon' />
              <input
                id='email'
                name='email'
                type='email'
                placeholder='Student Email/Teacher Email'
                autoComplete='email'
                required
              />
            </div>
          </div>
          <div className='authFieldGroup'>
            <div>
              <label htmlFor='password'>Password</label>
              <div className='authInputWrap'>
                <FontAwesomeIcon icon={faKey} className='authIcon' />
                <input
                  id='password'
                  name='password'
                  type={isVisible ? "text" : "password"}
                  placeholder='Password'
                  autoComplete='current-password'
                  required
                />
                <button
                  type='button'
                  className='authPasswordToggle'
                  onClick={() => setIsVisible((current) => !current)}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                >
                  <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} className='authIcon' />
                </button>
              </div>
            </div>
          </div>

          {showCaptcha && <Captcha />}
          <button className='authSubmitButton' type='submit' id='loginBtn' disabled={isPending}>
            <FontAwesomeIcon icon={faArrowRightToBracket} className='authSubmitIcon' />
            {isPending ? "Signing in..." : "Continue"}
          </button>
          <div className='authSignupNote'>
            <p>
              <b>Don&apos;t have an account yet? </b>
            </p>
            <h5>Sign up during the registration period. See announcements for more details.</h5>
          </div>
        </div>
      </form>
    </div>
  );
}
