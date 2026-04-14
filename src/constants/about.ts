import type { Feature } from '../types';

export interface AboutCard {
  icon: string; // asset path
  title: string;
  description: string;
}

export const aboutCards: AboutCard[] = [
  {
    icon: '/assets/Group 19.png',
    title: 'Sécurisé',
    description: 'Vos données sont protégées et sécurisées à tout moment.',
  },
  {
    icon: '/assets/Group 19 (1).png',
    title: 'Facile à utiliser',
    description: 'Une interface intuitive et agréable pour tous les utilisateurs.',
  },
  {
    icon: '/assets/Group 19 (2).png',
    title: 'Communauté',
    description: 'Rejoignez une communauté active et bienveillante.',
  },
  {
    icon: '/assets/Group 19 (3).png',
    title: 'Sorties & Rencontres réelles',
    description: 'Accédez à des offres spéciales dans des restaurants et clubs partenaires pour rencontrer vos matchs et vivre de vrais moments ensemble.',
  },
];
