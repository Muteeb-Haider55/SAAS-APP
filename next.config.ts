import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Consider setting this to false in CI once types are stable
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      // Add other Clerk image hosts if needed
      { protocol: "https", hostname: "images.clerk.dev" },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "usa-ty",
  project: "javascript-react",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
