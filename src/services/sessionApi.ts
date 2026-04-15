import { KISS_API_BASE_URL } from '../constants/kissConfig';

export interface SessionUser {
  pseudo: string;
  email: string;
  prenom: string | null;
  name: string | null;
}

export interface SessionCheckResponse {
  success: boolean;
  expires_at: string;
  user: SessionUser;
}

export async function checkSession(token: string): Promise<SessionCheckResponse> {
  const res = await fetch(`${KISS_API_BASE_URL}/payment/session/check`, {
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
