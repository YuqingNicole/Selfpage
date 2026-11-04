import type { Metadata } from 'next';

export const SITE_URL = 'https://www.nicoles.garden';
export const SITE_DESCRIPTION = "Nicole Chen's digital garden — product manager, builder, and AI explorer. Sharing lessons from product development, reflections on the AI revolution, and Claude Skills.";

/** Route-specific metadata belongs in the initial HTML, not a client-side effect. */
export function pageMetadata(path: string, metadata: Metadata): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const title = typeof metadata.title === 'string' ? metadata.title : 'Nicole Chen — Digital Garden';
  const description = metadata.description ?? SITE_DESCRIPTION;
  const images = [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Nicole Chen — Digital Garden' }];
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical: url },
    openGraph: { siteName: 'Nicole Chen', type: 'website', title, description, url, images, ...metadata.openGraph },
    twitter: { card: 'summary_large_image', title, description, images, ...metadata.twitter },
  };
}
