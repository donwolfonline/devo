/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:username',
        destination: '/[username]',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:username',
        headers: [
          {
            key: 'X-Subdomain-Profile',
            value: 'true',
          },
        ],
      },
    ];
  },
}

export default nextConfig;
