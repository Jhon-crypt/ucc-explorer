/** @type {import('next').NextConfig} */
const nextConfig = {
  // Re-enable static export with our new component structure
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
