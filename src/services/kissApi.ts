import { KISS_API_BASE_URL } from '../constants/kissConfig';
import type { ApiPackAbonnement } from '../types/pack';

export async function fetchPackAbonnement(): Promise<ApiPackAbonnement[]> {
  const res = await fetch(`${KISS_API_BASE_URL}/packAbonnement`);

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }

  return res.json();
}
