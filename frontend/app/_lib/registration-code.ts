import "server-only";

import { createDecipheriv } from "node:crypto";

const AES_256_KEY_LENGTH = 32;
const GCM_NONCE_LENGTH = 12;
const GCM_AUTH_TAG_LENGTH = 16;

function decodeBase64(value: string): Buffer | null {
    if (!/^[A-Za-z0-9+/_-]+={0,2}$/.test(value)) {
        return null;
    }

    try {
        return Buffer.from(value, "base64url");
    } catch {
        return null;
    }
}

function getEncryptionKey(): Buffer | null {
    const encodedKey = process.env.REGISTRATION_URL_AES_KEY?.trim();
    if (!encodedKey) {
        return null;
    }

    const key = decodeBase64(encodedKey);
    return key?.length === AES_256_KEY_LENGTH ? key : null;
}

/**
 * Decrypts a registration URL's `rel` parameter. The payload is base64url data
 * laid out as: 12-byte AES-GCM nonce | ciphertext | 16-byte authentication tag.
 */
export function decodeVerifiedRegistrationCode(payload: string | null | undefined): string | null {
    if (!payload) {
        return null;
    }

    const encrypted = decodeBase64(payload);
    const key = getEncryptionKey();
    if (!encrypted || !key || encrypted.length <= GCM_NONCE_LENGTH + GCM_AUTH_TAG_LENGTH) {
        return null;
    }

    const nonce = encrypted.subarray(0, GCM_NONCE_LENGTH);
    const authTag = encrypted.subarray(-GCM_AUTH_TAG_LENGTH);
    const ciphertext = encrypted.subarray(GCM_NONCE_LENGTH, -GCM_AUTH_TAG_LENGTH);

    try {
        const decipher = createDecipheriv("aes-256-gcm", key, nonce, {
            authTagLength: GCM_AUTH_TAG_LENGTH,
        });
        decipher.setAuthTag(authTag);

        const code = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
        return code.trim() === code && code.length > 0 ? code : null;
    } catch {
        return null;
    }
}
