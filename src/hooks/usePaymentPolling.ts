import { useState, useEffect, useCallback, useRef } from 'react';
import { initializePayment, verifyPayment, type InitializePayload } from '../services/paymentApi';

type TxGroup = 'success' | 'pending' | 'failed';
type PaymentStatus = 'idle' | 'initializing' | 'verifying' | 'success' | 'failed' | 'timeout';

const POLLING_INTERVAL = 3000;
const POLLING_TIMEOUT = 60000;
const SUCCESS_STATUSES = ['successful', 'success', 'transferred', 'approved', 'received', 'processed'];
const PENDING_STATUSES = ['pending', 'in_progress', 'waiting'];
const FAILED_STATUSES = ['failed', 'declined', 'rejected'];

function mapStatusToGroup(status: string): TxGroup {
  const normalizedStatus = status.toLowerCase();

  if (SUCCESS_STATUSES.includes(normalizedStatus)) return 'success';
  if (FAILED_STATUSES.includes(normalizedStatus)) return 'failed';
  if (PENDING_STATUSES.includes(normalizedStatus)) return 'pending';

  return 'pending';
}

interface PaymentResult {
  localTransactionId: string;
  status: string;
  kissAmount?: number;
}

interface UsePaymentPollingResult {
  status: PaymentStatus;
  transactionId: string | null;
  result: PaymentResult | null;
  error: string | null;
  initialize: (payload: Omit<InitializePayload, 'token'>) => Promise<void>;
  reset: () => void;
  reverify: () => void;
}

const SESSION_TOKEN_KEY = 'shokii_payment_token';

export function usePaymentPolling(): UsePaymentPollingResult {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [localTransactionId, setLocalTransactionId] = useState<string | null>(null);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);

  const clearPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopPolling = useCallback(() => {
    clearPolling();
  }, [clearPolling]);

  const poll = useCallback(async (txId: string) => {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    if (!token) {
      setError('Session expirée. Veuillez vous reconnecter.');
      setStatus('failed');
      stopPolling();
      return;
    }

    try {
      const response = await verifyPayment(txId, token);

      if (!response.success) {
        setStatus('failed');
        setError('La transaction a échoué.');
        stopPolling();
        return;
      }

      const txStatus = response.status;
      const txGroup = mapStatusToGroup(txStatus);
      setResult({
        localTransactionId: txId,
        status: txStatus,
      });

      if (txGroup === 'success') {
        setStatus('success');
        stopPolling();
        return;
      }

      if (txGroup === 'failed') {
        setStatus('failed');
        setError('Le paiement a été refusé. Veuillez réessayer.');
        stopPolling();
        return;
      }

    } catch (err) {
      console.error('Erreur lors de la vérification:', err);
    }
  }, [stopPolling]);

  const startPolling = useCallback((txId: string) => {
    startTimeRef.current = Date.now();

    pollingRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed >= POLLING_TIMEOUT) {
        setStatus('timeout');
        setError('La vérification du paiement prend plus de temps que prévu. Veuillez vérifier votre transaction ou réessayer.');
        stopPolling();
        return;
      }
      poll(txId);
    }, POLLING_INTERVAL);

    timeoutRef.current = setTimeout(() => {
      if (status === 'verifying') {
        setStatus('timeout');
        setError('La vérification du paiement prend plus de temps que prévu. Veuillez vérifier votre transaction ou réessayer.');
        stopPolling();
      }
    }, POLLING_TIMEOUT);

    poll(txId);
  }, [poll, stopPolling, status]);

  const reset = useCallback(() => {
    clearPolling();
    setStatus('idle');
    setLocalTransactionId(null);
    setResult(null);
    setError(null);
  }, [clearPolling]);

  const reverify = useCallback(() => {
    if (localTransactionId) {
      setError(null);
      setStatus('verifying');
      startPolling(localTransactionId);
    } else {
      reset();
    }
  }, [localTransactionId, startPolling, reset]);

  const initialize = useCallback(async (payload: Omit<InitializePayload, 'token'>) => {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    if (!token) {
      setError('Session expirée. Veuillez vous reconnecter.');
      setStatus('failed');
      return;
    }

    setStatus('initializing');
    setError(null);

    try {
      const response = await initializePayment({ ...payload, token });

      if (!response.success) {
        setStatus('failed');
        setError('Impossible d\'initialiser le paiement. Veuillez réessayer.');
        return;
      }

      const txId = response.data.local_transaction_id;
      setLocalTransactionId(txId);
      setStatus('verifying');
      startPolling(txId);

    } catch (err) {
      setStatus('failed');
      setError('Une erreur est survenue lors de l\'initialisation du paiement.');
    }
  }, [startPolling]);

  useEffect(() => {
    return () => {
      clearPolling();
    };
  }, [clearPolling]);

  return {
    status,
    transactionId: localTransactionId,
    result,
    error,
    initialize,
    reset,
    reverify,
  };
}
