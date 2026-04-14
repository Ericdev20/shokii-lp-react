import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
  ogType?: string;
  canonicalPath?: string;
}

const SITE_URL = 'https://shokii.com';

export function usePageMeta({ title, description, ogType = 'website', canonicalPath }: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    // Meta description
    setOrCreateMeta('description', 'name', 'description', description);

    // Open Graph
    setOrCreateMeta('og:title', 'property', 'og:title', title);
    setOrCreateMeta('og:description', 'property', 'og:description', description);
    setOrCreateMeta('og:type', 'property', 'og:type', ogType);
    setOrCreateMeta('og:locale', 'property', 'og:locale', 'fr_FR');
    setOrCreateMeta('og:url', 'property', 'og:url', `${SITE_URL}${canonicalPath || window.location.pathname}`);
    setOrCreateMeta('og:image', 'property', 'og:image', `${SITE_URL}/og-image.jpg`);

    // Twitter Card
    setOrCreateMeta('twitter:card', 'name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('twitter:title', 'name', 'twitter:title', title);
    setOrCreateMeta('twitter:description', 'name', 'twitter:description', description);
    setOrCreateMeta('twitter:image', 'name', 'twitter:image', `${SITE_URL}/og-image.jpg`);

    // Canonical
    setOrCreateLink('canonical', `${SITE_URL}${canonicalPath || window.location.pathname}`);

    // Cleanup on unmount — restore defaults
    return () => {
      document.title = 'Shokii – Trouvez l\'amour';
    };
  }, [title, description, ogType, canonicalPath]);
}

function setOrCreateMeta(key: string, attr: string, _attrName: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
