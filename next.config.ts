import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["cloud.appwrite.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
