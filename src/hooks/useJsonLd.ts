import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_META, KISS_META, SIGNUP_URL, CONTACT_EMAIL, CONTACT_PHONE } from '../constants';

export function useJsonLd() {
  const location = useLocation();

  useEffect(() => {
    // Remove existing
    const existing = document.querySelectorAll('script[type="application/ld+json"]');
    existing.forEach(el => el.remove());

    // Organization
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Shokii',
      url: 'https://shokii.com',
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      sameAs: [],
      description: SITE_META.description,
    };

    const scripts: Record<string, unknown>[] = [orgSchema];

    if (location.pathname === '/' || location.pathname === '') {
      // SoftwareApplication for landing page
      scripts.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Shokii',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'iOS, Android',
        description: SITE_META.description,
        url: 'https://shokii.com',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'XOF',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '1000000',
        },
      });
    }

    if (location.pathname === '/kiss') {
      scripts.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: KISS_META.title,
        description: KISS_META.description,
        url: 'https://shokii.com/kiss',
      });
    }

    scripts.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    };
  }, [location.pathname]);
}
