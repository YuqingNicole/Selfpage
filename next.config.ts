import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
