export interface Step {
  number: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
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
