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

async function detectCountryByIP(): Promise<string | null> {
  try {
    const res = await fetch('https://ip-api.com/json/?fields=countryCode');
    if (!res.ok) return null;
    const data = await res.json();
    return data.countryCode ?? null;
  } catch {
    return null;
  }
}

function detectCountryFromNavigator(): string | null {
  const lang = navigator.language;
  const match = lang.match(/[A-Z]{2}$/i);
  return match ? match[0].toUpperCase() : null;
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

      const detected = detectCountryFromNavigator() ?? (await detectCountryByIP());
      if (detected && data.some(c => c.Iso2 === detected)) {
        setDetectedCountry(detected);
      }
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
