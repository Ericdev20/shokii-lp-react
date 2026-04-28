import type { NavItem } from '../types';

export const mainNavItems: NavItem[] = [
  { label: 'Accueil', href: '/#accueil' },
  { label: 'À propos', href: '/#a-propos' },
  { label: 'Comment ça marche ?', href: '/#comment-ca-marche' },
  { label: 'Témoignages', href: '/#temoignages' },
  { label: 'Tarification', href: '/kiss', isExternal: true },
  { label: 'Contactez-nous', href: '/#contact' },

];

export const mainNavItemsWithKiss: NavItem[] = [
  ...mainNavItems,
  { label: 'KISS', href: '/kiss', isExternal: true },
];

export const footerNavItems: NavItem[] = [
  { label: 'Accueil', href: '/#accueil' },
  { label: 'À propos', href: '/#a-propos' },
  { label: 'Comment ça marche ?', href: '/#comment-ca-marche' },
  { label: 'Témoignages', href: '/#temoignages' },
  { label: 'Contact', href: '/#contact' },
];

export const footerHelpItems: NavItem[] = [
  { label: 'Plus de info sur l\'un de nos services', href: 'https://shokii.com/services' },
  { label: 'FAQ', href: 'https://shokii.com/faq' },
  { label: 'Politique de confidentialité', href: 'https://shokii.com/privacy-policy' },
  { label: 'Conditions d\'utilisation', href: 'https://shokii.com/terms-of-use' },
];
