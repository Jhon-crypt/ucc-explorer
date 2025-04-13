/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using default output setting for Vercel deployment
  // Do NOT use 'export' for Vercel deployments
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during build
    ignoreBuildErrors: true,
  },
  images: { 
    unoptimized: true,
    // Make sure this is correct for Next.js 15
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
