export interface Plan {
  id: string;
  kiss: number;
  price: number; // in FCFA
  badge?: 'popular' | 'best';
  description: string;
}
