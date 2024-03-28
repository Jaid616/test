/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "https://learnkoods-task.onrender.com",
          },
          {
            protocol: "http",
            hostname: "localhost",
          },
        ],
      },
};

export default nextConfig;
