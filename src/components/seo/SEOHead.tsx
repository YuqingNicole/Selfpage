import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';

const BASE_URL = 'https://nicoles.garden';

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

/**
 * SEO component for managing page meta tags, canonical URLs, and JSON-LD structured data.
 */
export function SEOHead({
  title,
  description,
  image = `${BASE_URL}/wechat-qr.jpg`,
  type = 'website',
  publishedTime,
  jsonLd,
}: SEOHeadProps) {
  const location = useLocation();

  const fullTitle = title
    ? `${title} | Nicole Chen`
    : 'Nicole Chen — Digital Garden';

  const fullDescription =
    description ||
    'Nicole Chen's digital garden — product manager, builder, and AI explorer. Sharing lessons from product development, reflections on the AI revolution, and Claude Skills.';

  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector: string, content: string, attr = 'content') => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('="');
        el.setAttribute(attrName, attrVal.replace('"', ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    // Standard
    setMeta('meta[name="description"]', fullDescription);
    setMeta('meta[name="author"]', 'Nicole Chen');
    setMeta('meta[name="robots"]', 'index, follow');

    // Open Graph
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', fullDescription);
    setMeta('meta[property="og:type"]', type);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[property="og:site_name"]', 'Nicole Chen');
    if (publishedTime) {
      setMeta('meta[property="article:published_time"]', publishedTime);
    }

    // Twitter
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', fullDescription);
    setMeta('meta[name="twitter:image"]', image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD — always inject Person + WebSite on every page, plus optional page-specific schema
    const injectJsonLd = (id: string, data: object) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    injectJsonLd('jsonld-person', personJsonLd);
    injectJsonLd('jsonld-website', websiteJsonLd);
    if (jsonLd) {
      injectJsonLd('jsonld-page', jsonLd);
    } else {
      document.getElementById('jsonld-page')?.remove();
    }
  }, [fullTitle, fullDescription, canonicalUrl, image, type, publishedTime, jsonLd]);

  return null;
}
