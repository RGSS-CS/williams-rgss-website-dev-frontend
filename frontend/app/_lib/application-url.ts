import "server-only";

import { createDecipheriv } from "node:crypto";

const ENVELOPE_VERSION = "v1";
const AES_256_KEY_LENGTH = 32;
const GCM_NONCE_LENGTH = 12;
const GCM_AUTH_TAG_LENGTH = 16;

function decodeBase64Url(value: string): Buffer | null {
    if (!/^[A-Za-z0-9_-]+$/.test(value)) {
        return null;
    }

    try {
        return Buffer.from(value, "base64url");
    } catch {
        return null;
    }
}

function getEncryptionKey(): Buffer | null {
    const encodedKey = process.env.APPLICATION_URL_AES_KEY;
    if (!encodedKey) {
        return null;
    }

    const key = decodeBase64Url(encodedKey);
    return key?.length === AES_256_KEY_LENGTH ? key : null;
}

function isAllowedApplicationUrl(value: string): boolean {
    try {
        const url = new URL(value);
        return url.protocol === "https:" && Boolean(url.hostname);
    } catch {
        return false;
    }
}

/**
 * Decrypts a backend-issued application URL and rejects anything that does not
 * prove possession of the shared AES-256-GCM key.
 *
 * Envelope format: v1.<base64url nonce>.<base64url ciphertext>.<base64url tag>
 */
export function decodeVerifiedApplicationUrl(envelope: string | null | undefined): string | null {
    if (!envelope) {
        return null;
    }

    const parts = envelope.split(".");
    if (parts.length !== 4 || parts[0] !== ENVELOPE_VERSION) {
        return null;
    }

    const [, encodedNonce, encodedCiphertext, encodedAuthTag] = parts;
    const key = getEncryptionKey();
    const nonce = decodeBase64Url(encodedNonce);
    const ciphertext = decodeBase64Url(encodedCiphertext);
    const authTag = decodeBase64Url(encodedAuthTag);

    if (
        !key ||
        !nonce || nonce.length !== GCM_NONCE_LENGTH ||
        !ciphertext ||
        !authTag || authTag.length !== GCM_AUTH_TAG_LENGTH
    ) {
        return null;
    }

    try {
        const decipher = createDecipheriv("aes-256-gcm", key, nonce, {
            authTagLength: GCM_AUTH_TAG_LENGTH,
        });
        decipher.setAuthTag(authTag);

        const url = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
        return isAllowedApplicationUrl(url) ? url : null;
    } catch {
        return null;
    }
}
