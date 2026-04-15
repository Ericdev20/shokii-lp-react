import { useState, useEffect, useCallback } from 'react';
import { fetchPaymentMethods, type PaymentMethod } from '../services/paymentMethodsApi';

interface UsePaymentMethodsResult {
  methods: PaymentMethod[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function usePaymentMethods(countryCode: string | null): UsePaymentMethodsResult {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMethods = useCallback(async () => {
    if (!countryCode) {
      setMethods([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPaymentMethods(countryCode);
      const allMethods = data.providers.flatMap((p) => p.methods);
      setMethods(allMethods);
    } catch (err) {
      setError('Impossible de charger les méthodes de paiement');
      setMethods([]);
    } finally {
      setLoading(false);
    }
  }, [countryCode]);

  useEffect(() => {
    loadMethods();
  }, [loadMethods]);

  return { methods, loading, error, retry: loadMethods };
}
