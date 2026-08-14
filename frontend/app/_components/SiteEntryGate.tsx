"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "cap-widget";
import type { CapSolveEvent, CapErrorEvent, CapWidget } from "cap-widget";
import { verifyEntryCaptcha } from "@/app/_lib/entry-gate";
import { CAP_API_ENDPOINT } from "@/app/_components/captcha";
import styles from "./SiteEntryGate.module.css";

type SiteEntryGateProps = {
    schoolName: string | null;
    councilName: string | null;
    children: React.ReactNode;
};

export default function SiteEntryGate({
    schoolName,
    councilName,
    children,
}: SiteEntryGateProps) {
    const [entered, setEntered] = useState(false);
    const [status, setStatus] = useState<"idle" | "verifying" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const widgetRef = useRef<CapWidget | null>(null);

    const handleSolve = useCallback(async (event: CapSolveEvent) => {
        const token = event.detail.token;
        setStatus("verifying");
        setErrorMessage(null);

        const result = await verifyEntryCaptcha(token);

        if (result.success) {
            setEntered(true);
            return;
        }

        setStatus("error");
        setErrorMessage(result.error ?? "Verification failed. Please try again.");
        widgetRef.current?.reset();
    }, []);

    const handleError = useCallback((event: CapErrorEvent) => {
        setStatus("error");
        setErrorMessage(event.detail.message || "Something went wrong. Please try again.");
    }, []);

    useEffect(() => {
        const widget = widgetRef.current;
        if (!widget) return;

        widget.addEventListener("solve", handleSolve);
        widget.addEventListener("error", handleError);

        return () => {
            widget.removeEventListener("solve", handleSolve);
            widget.removeEventListener("error", handleError);
        };
    }, [handleSolve, handleError]);

    if (entered) {
        return <>{children}</>;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <div className={styles.logoWrap}>
                    <Image src="/images/logo/logo.png" alt="School logo" width={56} height={42} priority />
                </div>
                <h1 className={styles.title}>Welcome to {schoolName ?? "the site"}</h1>
                <p className={styles.subtitle}>
                    Quick check before you enter the {councilName ?? "Student Council"} site.
                </p>

                <div className={styles.widgetWrap} suppressHydrationWarning>
                    <cap-widget ref={widgetRef} data-cap-api-endpoint={CAP_API_ENDPOINT} suppressHydrationWarning />
                </div>

                {status === "verifying" && (
                    <p className={styles.status}>Verifying…</p>
                )}
                {status === "error" && errorMessage && (
                    <p className={styles.statusError}>{errorMessage}</p>
                )}
            </div>
        </div>
    );
}