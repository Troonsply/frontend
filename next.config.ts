import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: "/frontend",
    output: 'export',
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
