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
  typescript: {
    // GSAP node_modules 内部文件大小写冲突 (Observer.d.ts vs observer.d.ts)
    // 属第三方包问题，不影响运行时，跳过构建时 TS 类型检查
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
