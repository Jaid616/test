/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "learnkoodsapi.onrender.com",
          },
          {
            protocol: "http",
            hostname: "localhost",
          },
        ],
      },
};

export default nextConfig;
