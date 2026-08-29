"use client";

import { useEffect, useRef, useState } from "react";
import type { CapWidget } from "cap-widget";
import { CAPTCHAURL } from "../_lib/captcha";

type CaptchaProps = {
    className?: string;
    errorClassName?: string;
    loadingClassName?: string;
    onSolve?: (token: string) => void;
};

export default function Captcha({
    className = "authCaptcha",
    errorClassName = "authFormError",
    loadingClassName = "authCaptchaLoading",
    onSolve,
}: CaptchaProps) {
    const [isReady, setIsReady] = useState(false);
    const [hasLoadError, setHasLoadError] = useState(false);
    const widgetRef = useRef<CapWidget>(null);
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

    useEffect(() => {
        const widget = widgetRef.current;
        if (!isReady || !widget || !onSolve) {
            return;
        }

        const handleSolve = (event: Event) => {
            const token = (event as CustomEvent<{ token?: string }>).detail?.token;
            if (token) {
                onSolve(token);
            }
        };

        widget.addEventListener("solve", handleSolve);
        return () => widget.removeEventListener("solve", handleSolve);
    }, [isReady, onSolve]);

    if (!captchaEndpoint) {
        return (
            <div className={errorClassName} role='alert'>
                Captcha is not configured. Please contact an administrator.
            </div>
        );
    }

    if (hasLoadError) {
        return (
            <div className={errorClassName} role='alert'>
                Captcha failed to load. Please refresh the page and try again.
            </div>
        );
    }

    if (!isReady) {
        return (
            <div className={className} aria-busy='true'>
                <div className={loadingClassName} />
            </div>
        );
    }

    return (
        <div className={className}>
            <cap-widget
                ref={widgetRef}
                data-cap-api-endpoint={captchaEndpoint}
                data-cap-hidden-field-name='captcha_token'
                required
            />
        </div>
    );
}
