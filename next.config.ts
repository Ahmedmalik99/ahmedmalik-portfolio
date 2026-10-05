import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Only the public GitHub avatar is loaded remotely, from a fixed path.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/156577128",
      },
    ],
    // Next.js 16 defaults to [75]; the avatar is displayed small so this is the
    // only size we need.
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // Trim the JS shipped for the 3D layer — three is the bulk of the payload.
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei"],
  },
};

export default nextConfig;