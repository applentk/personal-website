import "dotenv/config"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
        hostname: process.env.NEXT_PUBLIC_S3_PUBLIC_URL!?.replace("https://", ""),
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
