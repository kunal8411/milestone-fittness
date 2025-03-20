import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true, // Use unoptimized images to avoid optimization issues
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp', 'image/avif'], // Support modern formats
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Additional size options
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
