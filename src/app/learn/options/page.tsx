import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '期权学园 — 像多邻国一样学期权',
  description:
    '游戏化的期权交易课程：14 个单元、42 节课，从期权基础、定价、希腊字母到波动率偏度、Gamma 对冲流、高级价差，再到 tastylive 风格的概率化机制交易。闯关、攒经验、保持连胜，从零基础学到体系化实战。',
};

export default function OptionsCoursePage() {
  return <OptionsCourseApp />;
}
