import type { Plan } from '../types';

export const plans: Plan[] = [
  {
    id: '500',
    kiss: 500,
    price: 100000,
    description: 'Idéal pour découvrir les fonctionnalités KISS et envoyer tes premiers cadeaux.',
  },
  {
    id: '1000',
    kiss: 1000,
    price: 180000,
    badge: 'popular',
    description: 'Le pack préféré de nos utilisateurs. Économise 10% et profite pleinement de Shokii.',
  },
  {
    id: '2000',
    kiss: 2000,
    price: 320000,
    badge: 'best',
    description: 'Le meilleur rapport qualité/prix. Économise 20% et accède à tout sans limite.',
  },
];

export const CUSTOM_PRICE_PER_KISS = 200;
