/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export as it's causing type issues
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
