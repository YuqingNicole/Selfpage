import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: 'nicoles\\.garden' }],
      destination: 'https://www.nicoles.garden/:path*',
      permanent: true,
    }];
  },
  async rewrites() {
    return [
      {
        source: '/reading-room/paradaily-7f3c9a',
        destination: '/reading-room/paradaily-7f3c9a/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/reading-room/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
