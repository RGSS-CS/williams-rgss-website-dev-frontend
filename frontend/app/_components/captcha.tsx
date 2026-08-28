"use client";

import { useEffect, useState } from "react";
import { CAPTCHAURL } from "../_lib/captcha";

export default function Captcha() {
  const [isReady, setIsReady] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const captchaEndpoint = CAPTCHAURL?.trim();

  useEffect(() => {
    let isMounted = true;

    import("cap-widget")
      .then(() => {
        if (isMounted) {
          setIsReady(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasLoadError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!captchaEndpoint) {
    return (
      <div className='authFormError' role='alert'>
        Captcha is not configured. Please contact an administrator.
      </div>
    );
  }

  if (hasLoadError) {
    return (
      <div className='authFormError' role='alert'>
        Captcha failed to load. Please refresh the page and try again.
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className='authCaptcha' aria-busy='true'>
        <div className='authCaptchaLoading' />
      </div>
    );
  }

  return (
    <div className='authCaptcha'>
      <cap-widget
        data-cap-api-endpoint={captchaEndpoint}
        data-cap-hidden-field-name='captcha_token'
        required
      />
    </div>
  );
}
