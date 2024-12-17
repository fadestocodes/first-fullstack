import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'l3.googleusercontent.com', 'd3amjv0mo6dgie.cloudfront.net'], 
  },
  serverExternalPackages: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],

};

export default nextConfig;

