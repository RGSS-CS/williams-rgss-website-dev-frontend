import type { NextConfig } from "next";

const mediaUrl = process.env.MEDIA_URL;

const nextConfig: NextConfig = {
    experimental: {
        globalNotFound: true,
    },
    devIndicators: false,
    output: 'standalone',
    cacheComponents: true,
    agentRules: false,
    images: {
        remotePatterns: mediaUrl ? [new URL(mediaUrl)] : [],
    }
}

export default nextConfig
