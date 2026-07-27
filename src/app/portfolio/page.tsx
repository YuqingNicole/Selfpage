import type { Metadata } from 'next';
import Portfolio from '@/views/Portfolio';

export const metadata: Metadata = {
  title: 'Skills & Projects',
  description: 'Claude AI Skills, projects, and tools built by Nicole Chen.',
};

export default function Page() {
  return <Portfolio />;
}
