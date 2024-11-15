/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lovely-flamingo-139.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'sleek-capybara-771.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'neighborly-tapir-7.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'efficient-elephant-639.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'neighborly-tapir-7.convex.cloud/api/huggingface',
      },
    ],
  },
}

export default nextConfig
