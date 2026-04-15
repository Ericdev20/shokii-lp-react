import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchCountries, type ApiCountry } from '../services/countriesApi';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

function mapApiToCountry(apiCountry: ApiCountry): Country {
  return {
    code: apiCountry.Iso2,
    name: apiCountry.name,
    flag: apiCountry.emoji ?? apiCountry.Iso2,
    dialCode: apiCountry.dial_code ?? '',
  };
}

interface UseCountriesResult {
  countries: Country[];
  loading: boolean;
  error: string | null;
  detectedCountry: string | null;
  retry: () => void;
}

export function useCountries(): UseCountriesResult {
  const [allCountries, setAllCountries] = useState<ApiCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  const loadCountries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCountries();
      setAllCountries(data);
      setDetectedCountry('BJ'); // Benin par défaut
    } catch (err) {
      setError('Impossible de charger les pays');
      setAllCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const countries = useMemo(() => {
    return allCountries
      .map(mapApiToCountry)
      .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }, [allCountries]);

  return { countries, loading, error, detectedCountry, retry: loadCountries };
}
