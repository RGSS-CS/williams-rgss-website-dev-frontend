"use server";

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
    { name: "password", label: "Password" },
    { name: "confirm_password", label: "Confirm password" },
];

function findMissingField(formData: FormData): string | null {
    for (const field of REQUIRED_FIELDS) {
        const value = formData.get(field.name)?.toString().trim() ?? "";
        if (!value) {
            return field.label;
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

    const firstName = formData.get("first_name")?.toString() ?? "";
    const lastName = formData.get("last_name")?.toString() ?? "";

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

    // TODO: wire up to the backend registration endpoint once it exists.
    // Validation and profanity checks have passed at this point, so it is
    // safe to proceed with account creation.

    return { error: null };
}

export async function signin(formData: FormData) {
    void formData;
}