/** @type {import('next').NextConfig} */
import "./env.mjs";

const nextConfig = {
  images: {
    domains: [
      "fiipractic-2024.s3.eu-central-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
