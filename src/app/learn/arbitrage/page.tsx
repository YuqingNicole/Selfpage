import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '投资学园 · 套利篇 — 像多邻国一样学套利',
  description:
    '投资学园的套利篇：5 个单元、15 节课，从链上世界入门、AMM 与滑点、资金费率与期现套利，到 MEV 防御与美股套利（股票永续、ETF/ADR 价差、并购套利）；配套资金费模拟器和 5 个真实案例的套利工坊。与期权篇共享经验值、连胜与错题本。',
};

export default function ArbitrageCoursePage() {
  return <OptionsCourseApp variant="arb" />;
}
