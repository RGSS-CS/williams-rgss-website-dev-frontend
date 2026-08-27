"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { findProfaneField } from "@/app/private/authentication/_utils/profanityCheck";

export type SignupState = {
    error: string | null;
};

const PROFANITY_FIELD_LABELS: Record<string, string> = {
    first_name: "First name",
    last_name: "Last name",
};

const REQUIRED_FIELDS: { name: string; label: string }[] = [
    { name: "first_name", label: "First name" },
    { name: "last_name", label: "Last name" },
    { name: "student_number", label: "Student number" },
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
    { name: "confirm_password", label: "Confirm password" },
    { name: "code", label: "Registration code" },
];

const USERNAME_PATTERN = /^[\w.@+-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function findMissingField(formData: FormData): string | null {
    for (const field of REQUIRED_FIELDS) {
        const value = formData.get(field.name)?.toString().trim() ?? "";
        if (!value) {
            return field.label;
        }
    }

    return null;
}

function getApiBaseUrl(): string {
    return process.env.API_URL || "http://backend:8000";
}

type RegisterPayload = {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
    code: string;
};

type RegisterErrorBody = Partial<Record<keyof RegisterPayload | "detail" | "non_field_errors", string[] | string>>;

function extractFirstError(body: unknown): string | null {
    if (!body || typeof body !== "object") {
        return null;
    }

    for (const value of Object.values(body as RegisterErrorBody)) {
        if (Array.isArray(value) && value.length > 0) {
            return String(value[0]);
        }
        if (typeof value === "string" && value.trim()) {
            return value;
        }
    }

    return null;
}

export async function signup(
    _prevState: SignupState,
    formData: FormData
): Promise<SignupState> {
    const missingFieldLabel = findMissingField(formData);
    if (missingFieldLabel) {
        return {
            error: `${missingFieldLabel} is required. Please fill in all fields and try again.`,
        };
    }

    const firstName = formData.get("first_name")?.toString().trim() ?? "";
    const lastName = formData.get("last_name")?.toString().trim() ?? "";
    const username = formData.get("student_number")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirm_password")?.toString() ?? "";
    const code = formData.get("code")?.toString().trim() ?? "";

    const profaneField = findProfaneField({
        first_name: firstName,
        last_name: lastName,
    });

    if (profaneField) {
        const label = PROFANITY_FIELD_LABELS[profaneField] ?? "One of the fields";
        return {
            error: `${label} contains language that isn't allowed. Please update it and try again.`,
        };
    }

    if (!USERNAME_PATTERN.test(username)) {
        return {
            error: "Student number can only contain letters, numbers, and @/./+/-/_ characters.",
        };
    }

    if (!EMAIL_PATTERN.test(email)) {
        return { error: "Enter a valid email address." };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords don't match." };
    }

    const payload: RegisterPayload = {
        username,
        email,
        password,
        password2: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        code,
    };

    let response: Response;
    try {
        response = await fetch(new URL("/api/register/", getApiBaseUrl()), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            cache: "no-store",
        });
    } catch {
        return {
            error: "Unable to reach the server. Check your connection and try again.",
        };
    }

    if (!response.ok) {
        let body: unknown = null;
        try {
            body = await response.json();
        } catch {
        }

        return {
            error:
                extractFirstError(body) ??
                `Registration failed (status ${response.status}). Please try again.`,
        };
    }

    redirect("/private/authentication?registered=1");
}

export type SigninState = {
    error: string | null;
};

export async function signin(
    _prevState: SigninState,
    formData: FormData
): Promise<SigninState> {
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    let response: Response;
    try {
        response = await fetch(new URL("/api/token", getApiBaseUrl()), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
            cache: "no-store",
        });
    } catch {
        return { error: "Unable to reach the server. Check your connection and try again." };
    }

    let body: { access?: string; refresh?: string; detail?: string } = {};
    try {
        body = await response.json();
    } catch {
    }

    if (!response.ok || !body.access || !body.refresh) {
        return {
            error: body.detail ?? "Invalid email or password. Please try again.",
        };
    }

    const cookieStore = await cookies();
    const secure = process.env.NODE_ENV === "production";
    cookieStore.set("access_token", body.access, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        path: "/",
    });
    cookieStore.set("refresh_token", body.refresh, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        path: "/",
    });

    redirect("/private/dashboard");
}
