import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        globalNotFound: true,
    },
    devIndicators: false,
    output: 'standalone',
    cacheComponents: true,
    agentRules: false,
    images: {
        dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
        remotePatterns: [new URL(process.env.MEDIA_URL || 'http://localhost:8000/media/**')], //Add env for backend 
    }
}

export default nextConfig
