import { useState, useEffect, useCallback } from 'react';
import { checkSession, type SessionUser } from '../services/sessionApi';

const SESSION_TOKEN_KEY = 'shokii_payment_token';

export interface PaymentSession {
  valid: boolean;
  user: SessionUser | null;
  expiresAt: string | null;
  loading: boolean;
  error: string | null;
}

function getTokenFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}

function saveTokenToLocalStorage(token: string): void {
  localStorage.setItem(SESSION_TOKEN_KEY, token);
}

function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem(SESSION_TOKEN_KEY);
}

function removeTokenFromLocalStorage(): void {
  localStorage.removeItem(SESSION_TOKEN_KEY);
}

export function usePaymentSession(): PaymentSession {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [valid, setValid] = useState(false);

  const validateSession = useCallback(async () => {
    const urlToken = getTokenFromUrl();
    
    if (urlToken) {
      saveTokenToLocalStorage(urlToken);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }

    const token = urlToken || getTokenFromLocalStorage();

    if (!token) {
      setError('Votre session de paiement n\'est plus valide. Veuillez retourner sur l\'application Shokii, vous reconnecter si nécessaire, puis relancer votre achat.');
      setValid(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await checkSession(token);

      if (data.success) {
        setUser(data.user);
        setExpiresAt(data.expires_at);
        setValid(true);
        setError(null);
      } else {
        removeTokenFromLocalStorage();
        setError('Votre session de paiement a expiré. Veuillez retourner sur l\'application Shokii, vous reconnecter si nécessaire, puis relancer votre achat.');
        setValid(false);
      }
    } catch (err) {
      removeTokenFromLocalStorage();
      setError('Votre session de paiement n\'est plus valide. Veuillez retourner sur l\'application Shokii, vous reconnecter si nécessaire, puis relancer votre achat.');
      setValid(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return { valid, user, expiresAt, loading, error };
}
