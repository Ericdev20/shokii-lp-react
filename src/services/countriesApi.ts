import { KISS_API_BASE_URL } from '../constants/kissConfig';

export interface ApiCountry {
  name: string;
  Iso2: string;
  Iso3: string;
  dial_code: string | null;
  emoji: string | null;
  unicode: string | null;
}

export interface CountriesResponse {
  error: boolean;
  msg: string;
  data: ApiCountry[];
}

export async function fetchCountries(lang: string = 'fr'): Promise<ApiCountry[]> {
  const res = await fetch(`${KISS_API_BASE_URL}/countries/info?lang=${lang}`);

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }

  const json: CountriesResponse = await res.json();

  if (json.error) {
    throw new Error(json.msg || 'Erreur lors de la récupération des pays');
  }

  return json.data;
}
