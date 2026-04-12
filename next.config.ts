import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/** Project root — avoids Turbopack picking a parent folder when multiple lockfiles exist. */
const turbopackRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
