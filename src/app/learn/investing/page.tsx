import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '投资学园 — 建立你自己的投资判断框架',
  description:
    '投资学园判断框架主线：像多邻国一样闯关，从看懂市场语言（市值、利润、现金流、利率）到看懂公司。每日一案用真实历史案例训练判断——先做判断，再看真实结局。让你不再只能靠消息、KOL 和情绪做投资决定。',
};

export default function InvestingCoursePage() {
  return <OptionsCourseApp variant="invest" />;
}
