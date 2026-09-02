const publicMediaBaseUrl = process.env.PUBLIC_MEDIA_BASE_URL;

export function toPublicMediaUrl(mediaUrl: string): string {
    if (!publicMediaBaseUrl || !mediaUrl) {
        return mediaUrl;
    }

    try {
        const publicBaseUrl = new URL(publicMediaBaseUrl);
        // Media URLs returned by the API may be either absolute or relative.
        // Use a placeholder origin so both forms can be parsed consistently.
        const sourceUrl = new URL(mediaUrl, "http://media.local");

        if (!sourceUrl.pathname.startsWith("/media/")) {
            return mediaUrl;
        }

        return new URL(
            `${sourceUrl.pathname}${sourceUrl.search}${sourceUrl.hash}`,
            publicBaseUrl,
        ).toString();
    } catch {
        return mediaUrl;
    }
}
