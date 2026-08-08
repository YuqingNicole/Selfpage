import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '套利学园 — 像多邻国一样学套利',
  description:
    '游戏化的套利课程：4 个单元、12 节课，从链上世界入门、AMM 与滑点、资金费率与期现套利，到 MEV 防御与风险清单；配套资金费模拟器和 5 个真实案例的套利工坊。与期权学园共享经验值、连胜与错题本。',
};

export default function ArbitrageCoursePage() {
  return <OptionsCourseApp variant="arb" />;
}
