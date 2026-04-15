import { KISS_API_BASE_URL } from '../constants/kissConfig';

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
  logo_url: string;
  min_amount: number | null;
  max_amount: number | null;
  currency: string;
}

export interface PaymentProvider {
  provider: string;
  provider_code: string;
  type: string;
  methods: PaymentMethod[];
}

export interface PaymentMethodsResponse {
  country_code: string;
  platform: string;
  providers: PaymentProvider[];
}

export async function fetchPaymentMethods(countryCode: string): Promise<PaymentMethodsResponse> {
  const res = await fetch(`${KISS_API_BASE_URL}/payment-methods?country=${countryCode}`, {
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }

  return res.json();
}
