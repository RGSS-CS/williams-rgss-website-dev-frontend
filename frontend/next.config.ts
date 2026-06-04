import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  experimental: {
    globalNotFound: true,
  }
}

export default nextConfig;