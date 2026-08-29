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
        remotePatterns: [new URL('http://localhost:8000/media/**'), new URL('http://backend:8000/media/**')], //Add env for backend 
        //dangerouslyAllowLocalIP: true //TODO: REMOVE LATER
    }
};

export default nextConfig;
