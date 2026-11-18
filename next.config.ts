import type { NextConfig } from 'next';
import { execSync } from 'node:child_process';

/** 构建版本号：构建日期（北京时间）+ 提交短哈希，显示在页脚，方便确认线上是哪次部署 */
function buildSha(): string {
  const fromVercel = process.env.VERCEL_GIT_COMMIT_SHA;
  if (fromVercel) return fromVercel.slice(0, 7);
  try {
    return execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return 'dev';
  }
}
const buildDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' })
  .format(new Date())
  .replaceAll('-', '.');

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: `v${buildDate}`,
    NEXT_PUBLIC_BUILD_SHA: buildSha(),
  },
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
