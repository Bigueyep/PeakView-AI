/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  eslint: {
    ignoreDuringBuilds: false
  },
  output: 'standalone'
};

export default nextConfig;
