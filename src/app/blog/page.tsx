import type { Metadata } from 'next';
import Blog from '@/views/Blog';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on product management, AI, and building in public.',
};

export default function Page() {
  return <Blog />;
}
