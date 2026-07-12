import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  devIndicators: false,
  output: 'standalone',
  cacheComponents: true,
};

export default nextConfig;
