import { useState, useEffect, useCallback } from 'react';
import { fetchPackAbonnement } from '../services/kissApi';
import { mapApiToPlan, type Plan } from '../types/pack';

interface UsePackAbonnementResult {
  packs: Plan[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function usePackAbonnement(): UsePackAbonnementResult {
  const [packs, setPacks] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPacks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPackAbonnement();
      const mappedPacks = data.map(mapApiToPlan);
      setPacks(mappedPacks);
    } catch (err) {
      setError('Impossible de charger les packs. Réessayer');
      setPacks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPacks();
  }, [loadPacks]);

  return { packs, loading, error, retry: loadPacks };
}
