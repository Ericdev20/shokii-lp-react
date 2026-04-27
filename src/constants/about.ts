import { useTranslation } from '../hooks/useTranslation';

export interface AboutCard {
  icon: string;
  title: string;
  description: string;
}

const aboutCardsFr: AboutCard[] = [
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

const aboutCardsEn: AboutCard[] = [
  {
    icon: '/assets/Group 19.png',
    title: 'Secure',
    description: 'Your data is protected and secure at all times.',
  },
  {
    icon: '/assets/Group 19 (1).png',
    title: 'Easy to use',
    description: 'An intuitive and pleasant interface for all users.',
  },
  {
    icon: '/assets/Group 19 (2).png',
    title: 'Community',
    description: 'Join an active and supportive community.',
  },
  {
    icon: '/assets/Group 19 (3).png',
    title: 'Real Dates',
    description: 'Access special offers at partner restaurants and clubs to meet your matches and share real moments together.',
  },
];

export function useAboutCards() {
  const { isFrench } = useTranslation();
  return isFrench ? aboutCardsFr : aboutCardsEn;
}
