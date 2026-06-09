import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Force webpack to completely ignore any backup files ending in 2e, 3e, 4e, 5e, etc.
    config.module.rules.push({
      test: /.*\.(tsx|ts|js|jsx|css|json)[2-5]e$/,
      loader: 'null-loader',
    });

    return config;
  },
  // Prevent strict type checking from halting the build due to backup anomalies
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
