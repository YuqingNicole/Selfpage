import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/work/arti-benchmark/dataset', { title: '测试集 — ARTi Benchmark', description: '投研评测的问题分类、测试集构建步骤与数据来源。' });
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}
