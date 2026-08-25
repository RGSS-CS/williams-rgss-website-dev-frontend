import { profanity } from "@2toad/profanity";

export function findProfaneField(
    fields: Record<string, string | null | undefined>
): string | null {
    for (const [fieldName, value] of Object.entries(fields)) {
        if (!value) continue;
        if (profanity.exists(value)) {
            return fieldName;
        }
    }

    return null;
}