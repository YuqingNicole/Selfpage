import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/work/arti-benchmark/leaderboard', { title: '排行榜 — ARTi Benchmark', description: 'ARTi 投研能力评测的排行榜方案。' });
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}
