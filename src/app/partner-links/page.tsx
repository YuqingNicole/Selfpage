import type { Metadata } from 'next';
import PartnerLinks from '@/views/PartnerLinks';

export const metadata: Metadata = {
  title: 'Partner Links',
  description: 'Curated tools and resources.',
};

export default function Page() {
  return <PartnerLinks />;
}
