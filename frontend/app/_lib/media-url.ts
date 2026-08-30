const publicMediaBaseUrl = process.env.PROXIED_URL;

export function toPublicMediaUrl(mediaUrl: string): string {
    if (!publicMediaBaseUrl || !mediaUrl) {
        return mediaUrl;
    }

    try {
        const sourceUrl = new URL(mediaUrl);
        const publicBaseUrl = new URL(publicMediaBaseUrl);

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
