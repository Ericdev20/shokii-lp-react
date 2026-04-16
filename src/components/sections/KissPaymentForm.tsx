import { useState, useCallback, useEffect } from 'react';
import { formatNumber } from '../../lib/format';
import { Reveal } from '../ui/Reveal';
import { CountrySelect } from '../ui/CountrySelect';
import { PaymentMethodsList } from '../ui/PaymentMethodCard';
import { UserInfo, SessionError } from '../ui/SessionStatus';
import { useCountries } from '../../hooks/useCountries';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import { usePaymentPolling } from '../../hooks/usePaymentPolling';
import type { PaymentMethod } from '../../services/paymentMethodsApi';
import type { SessionUser } from '../../services/sessionApi';

interface PlanSelection {
  kiss: number;
  price: number;
  label: string;
  id: string;
}

interface KissPaymentFormProps {
  selection: PlanSelection | null;
  user: SessionUser | null;
  sessionValid: boolean;
  sessionError: string | null;
  onCountryChange?: (countryCode: string) => void;
}

export function KissPaymentForm({ selection, user, sessionValid, sessionError, onCountryChange }: KissPaymentFormProps) {
  const { countries, loading: countriesLoading, error: countriesError, detectedCountry, retry: retryCountries } = useCountries();
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const { status, error: paymentError, initialize, reset, reverify } = usePaymentPolling();

  const { methods, loading: methodsLoading, error: methodsError, retry: retryMethods } = usePaymentMethods(country || null);

  useEffect(() => {
    if (detectedCountry && !country) {
      setCountry(detectedCountry);
    }
  }, [detectedCountry, country]);

  const selectedCountry = countries.find((c) => c.code === country);
  const dialCode = selectedCountry?.dialCode ?? '';
  const phonePlaceholder = selectedCountry ? `${selectedCountry.flag} Numéro sans indicatif` : 'XX XX XX XX';

  const isFormValid =
    !!country &&
    phone.trim().length > 0 &&
    phoneError === null &&
    selectedMethod !== null &&
    selection !== null;

  const handleCountryChange = useCallback((code: string) => {
    setCountry(code);
    setPhone('');
    setPhoneError(null);
    setSelectedMethod(null);
    onCountryChange?.(code);
  }, [onCountryChange]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\s/g, '');
    setPhone(value);

    if (cleaned.length > 0) {
      if (!/^\d+$/.test(cleaned)) {
        setPhoneError('Le numéro ne doit contenir que des chiffres');
      } else if (cleaned.length < 6) {
        setPhoneError('Le numéro est trop court');
      } else if (cleaned.length > 15) {
        setPhoneError('Le numéro est trop long');
      } else {
        setPhoneError(null);
      }
    } else {
      setPhoneError(null);
    }
  }, []);

  const handleMethodSelect = useCallback((method: PaymentMethod) => {
    setSelectedMethod(method);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selection || !selectedMethod) return;

    const phoneNumber = dialCode + phone.replace(/\s/g, '');
    const isCustomPurchase = selection.id === 'custom';

    await initialize({
      type: isCustomPurchase ? 'Achat KISS' : 'Abonnement',
      amount: selection.price,
      payment_method_code: selectedMethod.code,
      phone_number: phoneNumber,
      ...(isCustomPurchase ? {} : { abonnement_id: selection.id }),
    });
  }, [isFormValid, selection, selectedMethod, dialCode, phone, initialize]);

  useEffect(() => {
    reset();
  }, [selection]);

  const renderPaymentContent = () => {
    if (status === 'initializing') {
      return (
        <div className="payment-status payment-status--loading">
          <div className="payment-status__spinner">
            <i className="fa-solid fa-circle-notch fa-spin" />
          </div>
          <span>Initialisation du paiement...</span>
        </div>
      );
    }

    if (status === 'verifying') {
      return (
        <div className="payment-status payment-status--verifying">
          <div className="payment-status__spinner">
            <i className="fa-solid fa-circle-notch fa-spin" />
          </div>
          <span>Vérification du paiement en cours...</span>
          <span className="payment-status__hint">Veuillez patienter, cela peut prendre quelques instants.</span>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className="payment-status payment-status--success">
          <div className="payment-status__icon">
            <i className="fa-solid fa-check-circle" />
          </div>
          <h3>Paiement réussi !</h3>
          <p>Vos KISS ont été crédités sur votre compte.</p>
          {selection && (
            <div className="payment-status__amount">
              <span className="payment-status__kiss">{formatNumber(selection.kiss)}</span>
              <span className="payment-status__label">KISS ajoutés</span>
            </div>
          )}
          <p className="payment-status__hint">Vous pouvez retourner dans l'application Shokii pour dépenser vos KISS.</p>
          <a href="/" className="btn btn--gradient payment-status__close">
            D'accord
          </a>
        </div>
      );
    }

    if (status === 'failed') {
      return (
        <div className="payment-status payment-status--error">
          <div className="payment-status__icon">
            <i className="fa-solid fa-times-circle" />
          </div>
          <h3>Paiement refusé</h3>
          <p>{paymentError || 'Le paiement a été refusé. Veuillez réessayer.'}</p>
          <button
            type="button"
            className="btn btn--secondary payment-status__retry"
            onClick={reset}
          >
            Retour au formulaire
          </button>
        </div>
      );
    }

    if (status === 'timeout') {
      return (
        <div className="payment-status payment-status--error">
          <div className="payment-status__icon">
            <i className="fa-solid fa-exclamation-circle" />
          </div>
          <h3>Vérification en attente</h3>
          <p>{paymentError || 'La vérification du paiement prend plus de temps que prévu.'}</p>
          <div className="payment-status__actions">
            <button
              type="button"
              className="btn btn--gradient"
              onClick={reverify}
            >
              Revérifier
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="kiss-form__row">
          <div className="kiss-form__group">
            <label>Pays</label>
            <CountrySelect
              countries={countries}
              value={country}
              onChange={handleCountryChange}
              disabled={countriesLoading}
              error={countriesError}
              onRetry={retryCountries}
            />
          </div>
        </div>

        <div className="kiss-form__row">
          <div className="kiss-form__group">
            <label htmlFor="phone">Numéro de téléphone</label>
            <div className="kiss-form__phone">
              {dialCode && (
                <span className="kiss-form__phone-code" id="phoneCode">
                  {dialCode}
                </span>
              )}
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder={phonePlaceholder}
                required
                aria-label="Numéro de téléphone"
                disabled={!country}
              />
            </div>
            {phoneError && (
              <span className="kiss-form__phone-error">{phoneError}</span>
            )}
          </div>
        </div>

        <div className="kiss-form__row">
          <div className="kiss-form__group">
            <label>Mode de paiement</label>
            <PaymentMethodsList
              methods={methods}
              selectedMethod={selectedMethod}
              onSelect={handleMethodSelect}
              loading={methodsLoading}
              error={methodsError}
              onRetry={retryMethods}
            />
          </div>
        </div>

        <div className="kiss-form__summary" id="orderSummary">
          <h3>Récapitulatif de la commande</h3>
          <div className="kiss-form__summary-row">
            <span>Plan sélectionné</span>
            <span id="summaryPlan">{selection?.label ?? '—'}</span>
          </div>
          <div className="kiss-form__summary-row">
            <span>Quantité de KISS</span>
            <span id="summaryKiss">
              {selection ? `${formatNumber(selection.kiss)}` : '—'}
            </span>
          </div>
          <div className="kiss-form__summary-row kiss-form__summary-total">
            <span>Total</span>
            <span id="summaryTotal">
              {selection ? `${formatNumber(selection.price)} FCFA` : '—'}
            </span>
          </div>
        </div>

        <div className="kiss-form__submit">
          <button
            type="submit"
            className="btn btn--gradient kiss-form__paybtn"
            id="payBtn"
            disabled={!isFormValid}
          >
            <i className="fa-solid fa-lock" />
            Payer maintenant
          </button>
        </div>
      </>
    );
  };

  return (
    <section className="kiss-payment" id="payment">
      <div className="container">
        <Reveal>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Finalise ton achat
          </h2>
        </Reveal>
        <Reveal>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Remplis les informations ci-dessous pour recevoir tes KISS.
          </p>
        </Reveal>
        {user && (
          <Reveal>
            <div className="kiss-form__user">
              <UserInfo user={user} />
            </div>
          </Reveal>
        )}

        {!sessionValid && sessionError ? (
          <SessionError message={sessionError} />
        ) : (
          <form className="kiss-form" id="paymentForm" onSubmit={handleSubmit}>
            {renderPaymentContent()}
          </form>
        )}
      </div>
    </section>
  );
}
