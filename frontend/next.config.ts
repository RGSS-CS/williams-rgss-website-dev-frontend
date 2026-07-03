import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  cacheComponents: true,
}

export default nextConfig;