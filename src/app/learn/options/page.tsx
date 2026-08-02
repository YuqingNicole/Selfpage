import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '期权学园 — 像多邻国一样学期权',
  description:
    '游戏化的期权交易入门课程：8 个单元、24 节课，涵盖期权基础、定价、希腊字母、策略与风险管理。闯关、攒经验、保持连胜，零基础也能学会期权。',
};

export default function OptionsCoursePage() {
  return <OptionsCourseApp />;
}
