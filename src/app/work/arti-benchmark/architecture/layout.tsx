import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/work/arti-benchmark/architecture', { title: '架构方案 — ARTi Benchmark', description: '动态路由、结构化证据包、层间压缩、模型分级调度与自动评分修复。' });
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}
