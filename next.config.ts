import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.applentk.com",
        pathname: "/**"
      },
    ],
  }
};

export default nextConfig;
