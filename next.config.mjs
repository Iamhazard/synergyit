/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.vectorstock.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol:"https",
        hostname: "files.edgestore.dev",
      }
    ],
  },
};

export default nextConfig;
