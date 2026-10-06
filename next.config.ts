import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Serve every image as the original file: no resizing, no recompression.
  images: { unoptimized: true },
  // Pages are statically generated; no `output: "export"` so API routes can be added later.
};

export default nextConfig;
