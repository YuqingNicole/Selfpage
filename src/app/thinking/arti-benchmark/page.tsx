import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import ArtiBenchmark from '@/views/ArtiBenchmark';

export const metadata: Metadata = pageMetadata('/work/arti-benchmark', {
  title: 'ARTi Benchmark 方案 | Nicole',
  description: 'AI 模型投研能力 Benchmark 设计：评分体系、测试集构建、工程架构与排行榜实现方案。',
});

export default function Page() {
  return <div lang="zh-CN"><ArtiBenchmark /></div>;
}
