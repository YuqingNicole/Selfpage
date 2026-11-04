import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/ai-supply-chain-us', { title: '美股 AI 产业链观察', description: '观察美股 AI 供应链的相对表现、扩散质量与轮动信号。' });
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}
