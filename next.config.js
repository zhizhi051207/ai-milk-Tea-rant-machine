/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'replicate.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.replicate.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.replicate.delivery',
        pathname: '/**',
      },
    ],
  },
  // 启用 Edge Runtime 以获得更快的响应
  experimental: {
  },
};

module.exports = nextConfig;