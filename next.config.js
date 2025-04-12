/** @type {import('next').NextConfig} */
const nextConfig = {
  // Commenting out output export for local development
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
