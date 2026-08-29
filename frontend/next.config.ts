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
        remotePatterns: [new URL('http://localhost:8000/media/**'), new URL("http://dev.rgsscs.org/media/**")], //Add env for backend 
    }
}
