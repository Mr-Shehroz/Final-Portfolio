import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

/**
 * Enable bundle analyzer when ANALYZE=true
 */
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Enable compression (Brotli + Gzip)
  compress: true,

  // Experimental optimizations (safe to use)
  experimental: {
    optimizePackageImports: [
      "lodash",
      "date-fns",
      "firebase",
      "three",
      "lucide-react",
    ],
    swcPlugins: [], // keep empty unless needed
  },

  // Image optimization (recommended)
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["res.cloudinary.com"], // add your domains
  },

  // Cache headers for better performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
