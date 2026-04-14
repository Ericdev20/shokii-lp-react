export interface ApiPackAbonnement {
  id: number;
  duree: string;
  prix: number;
  nombreKiss: string;
  type: 'standard' | 'gold';
  description: string;
  benefits: string | null;
}

export interface Plan {
  id: string;
  kiss: number;
  price: number;
  badge?: 'popular' | 'best';
  description: string;
}

export function mapApiToPlan(apiPack: ApiPackAbonnement): Plan {
  return {
    id: String(apiPack.id),
    kiss: parseInt(apiPack.nombreKiss, 10),
    price: apiPack.prix,
    badge: apiPack.type === 'gold' ? 'best' : undefined,
    description: apiPack.description,
  };
}
