import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '期权学园 — 像多邻国一样学期权',
  description:
    '游戏化的期权与套利课程：18 个单元、54 节课，从期权基础、希腊字母、tastylive 机制交易，到链上套利（AMM、资金费率、MEV 防御）。闯关、攒经验、打 Boss，从零基础学到体系化实战。',
};

export default function OptionsCoursePage() {
  return <OptionsCourseApp />;
}
