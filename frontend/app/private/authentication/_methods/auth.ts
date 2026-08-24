"use server";

import { findProfaneField } from "@/app/private/authentication/_utils/profanityCheck";

export type SignupState = {
    error: string | null;
};

const PROFANITY_FIELD_LABELS: Record<string, string> = {
    first_name: "First name",
    last_name: "Last name",
};

export async function signup(
    _prevState: SignupState,
    formData: FormData
): Promise<SignupState> {
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
    // Profanity has been cleared at this point, so it is safe to proceed
    // with account creation.

    return { error: null };
}

export async function signin(formData: FormData) {
    void formData;
}