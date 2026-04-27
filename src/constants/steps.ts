import { useTranslation } from '../hooks/useTranslation';

export interface Step {
  number: number;
  title: string;
  description: string;
}

const stepsFr: Step[] = [
  {
    number: 1,
    title: 'Inscription et création de profil',
    description: 'Créez votre compte en quelques minutes et complétez votre profil pour commencer à rencontrer des personnes.',
  },
  {
    number: 2,
    title: 'Recherche et matching',
    description: 'Parcourez les profils et trouvez des personnes qui correspondent à vos critères grâce à notre algorithme.',
  },
  {
    number: 3,
    title: 'Discussion et rencontres',
    description: 'Échangez des messages et organisez de vraies rencontres avec vos matchs.',
  },
];

const stepsEn: Step[] = [
  {
    number: 1,
    title: 'Sign up and create profile',
    description: 'Create your account in minutes and complete your profile to start meeting people.',
  },
  {
    number: 2,
    title: 'Search and matching',
    description: 'Browse profiles and find people who match your criteria thanks to our algorithm.',
  },
  {
    number: 3,
    title: 'Chat and meetups',
    description: 'Exchange messages and organize real meetings with your matches.',
  },
];

export function useSteps() {
  const { isFrench } = useTranslation();
  return isFrench ? stepsFr : stepsEn;
}