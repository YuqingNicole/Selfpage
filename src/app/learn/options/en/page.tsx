import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = {
  title: 'Options Academy — Learn Options Like Duolingo',
  description:
    'A gamified options trading course with 14 units and 42 lessons. Learn options basics, pricing, Greeks, volatility skew, dealer hedging flows, advanced spreads, and tastylive-style probability-based trading one level at a time.',
};

export default function OptionsCourseEnglishPage() {
  return <OptionsCourseApp forceLang="en" />;
}
