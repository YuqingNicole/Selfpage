import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '期权学园 — 像多邻国一样学期权',
  description:
    '游戏化的期权课程：14 个单元、42 节课，从期权基础、定价、希腊字母到波动率偏度、高级价差与 tastylive 机制交易。闯关、攒经验、打 Boss，配套策略实验室与交易生存挑战。套利课程见独立的「套利学园」。',
};

export default function OptionsCoursePage() {
  return <OptionsCourseApp />;
}
