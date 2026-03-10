/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com", // Unsplash
      "cdn.sanity.io"        // Sanity
    ],
  },
};

export default nextConfig;