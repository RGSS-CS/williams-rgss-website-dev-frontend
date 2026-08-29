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
        remotePatterns: [new URL(process.env.MEDIA_URL)], //Add env for backend 
    }
}

export default nextConfig
