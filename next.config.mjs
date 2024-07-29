/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.vectorstock.com",
      },
    ],
  },
};

export default nextConfig;
