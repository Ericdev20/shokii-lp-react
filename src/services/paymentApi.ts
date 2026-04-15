import { KISS_API_BASE_URL } from '../constants/kissConfig';

export interface InitializePayload {
  token: string;
  type: 'Achat KISS' | 'Abonnement';
  amount: number;
  payment_method_code: string;
  phone_number: string;
  abonnement_id?: string;
}

export interface InitializeData {
  local_transaction_id: string;
  status: string;
  [key: string]: unknown;
}

export interface InitializeResponse {
  success: boolean;
  data: InitializeData;
}

export interface VerifyData {
  already_credited?: boolean;
  [key: string]: unknown;
}

export interface VerifyResponse {
  success: boolean;
  status: string;
  message?: string;
  data: VerifyData;
}

export async function initializePayment(payload: InitializePayload): Promise<InitializeResponse> {
  const res = await fetch(`${KISS_API_BASE_URL}/payment/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }

  return res.json();
}

export async function verifyPayment(localTransactionId: string, token: string): Promise<VerifyResponse> {
  const res = await fetch(`${KISS_API_BASE_URL}/payment/verify/${localTransactionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }

  return res.json();
}
