import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Readings from '@/views/Readings';

export const metadata: Metadata = pageMetadata('/readings', {
  title: 'Readings',
  description: 'A list of articles and essays worth revisiting.',
});

export default function Page() {
  return <Readings />;
}
