/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.rolly.app",
      },
      {
        protocol: "https",
        hostname: "*.withrolly.com",
      },
    ],
  },
};

export default nextConfig;
