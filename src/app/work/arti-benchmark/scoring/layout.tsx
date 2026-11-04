import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/work/arti-benchmark/scoring', { title: '评分体系 — ARTi Benchmark', description: '投研报告评测的评分维度与规则。' });
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}
