import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: '投资学园 · 期权篇 — 像多邻国一样学期权',
  description:
    '投资学园的期权篇：16 个单元、48 节课，从期权基础、定价、希腊字母到波动率偏度、tastylive 机制交易，以及期货、利率与持有成本的衍生品全景。闯关、攒经验、打 Boss，配套策略实验室与交易生存挑战。套利课程见独立的「套利篇」。',
};

export default function OptionsCoursePage() {
  return <OptionsCourseApp />;
}
