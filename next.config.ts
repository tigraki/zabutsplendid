import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pages are statically generated; no `output: "export"` so API routes can be added later.
};

export default nextConfig;
