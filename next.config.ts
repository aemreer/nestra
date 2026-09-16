import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  experimental: { serverActions: { bodySizeLimit: "11mb" } },
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_SUPABASE_URL ? [new URL("/storage/v1/object/public/model-media/**", process.env.NEXT_PUBLIC_SUPABASE_URL)] : [],
    qualities: [75, 85, 95],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
