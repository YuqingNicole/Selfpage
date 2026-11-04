'use client';

import { photographerInfo } from '@/data/photographer';

const BASE_URL = 'https://www.nicoles.garden';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  jsonLd?: object;
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nicole Chen',
  url: BASE_URL,
  sameAs: [
    photographerInfo.socialLinks.linkedin,
    photographerInfo.socialLinks.instagram,
  ].filter(Boolean),
  jobTitle: 'Product Manager',
  description: 'Product manager, builder, and AI explorer. Sharing lessons from product development and reflections on the AI revolution.',
  knowsAbout: ['Product Management', 'AI', 'Claude Skills', 'Software Development', 'SEO', 'GEO'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nicole Chen — Digital Garden',
  url: BASE_URL,
  description: 'A digital garden where product thinking, hands-on building, and AI-driven creativity converge.',
  author: { '@type': 'Person', name: 'Nicole Chen' },
  inLanguage: ['en', 'zh'],
};

/** Metadata is emitted by each server route. This component only renders structured data. */
export function SEOHead({ jsonLd }: SEOHeadProps) {
  return <>{[personJsonLd, websiteJsonLd, jsonLd].filter(Boolean).map((data, index) =>
    <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />,
  )}</>;
}
