import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.applentk.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "https://pub-22c8d20aa6f24b3895a2cdb65854b43f.r2.dev",
        pathname: "/**"
      }
    ],
  }
};

export default nextConfig;
