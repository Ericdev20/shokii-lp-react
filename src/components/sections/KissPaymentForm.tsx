import { useState, useCallback, useEffect } from 'react';
import { formatNumber } from '../../lib/format';
import { Reveal } from '../ui/Reveal';
import { CountrySelect } from '../ui/CountrySelect';
import { PaymentMethodsList } from '../ui/PaymentMethodCard';
import { useCountries } from '../../hooks/useCountries';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import type { PaymentMethod } from '../../services/paymentMethodsApi';

interface PlanSelection {
  kiss: number;
  price: number;
  label: string;
}

interface KissPaymentFormProps {
  selection: PlanSelection | null;
  onCountryChange?: (countryCode: string) => void;
}

type PaymentState = 'idle' | 'processing' | 'success';

export function KissPaymentForm({ selection, onCountryChange }: KissPaymentFormProps) {
  const { countries, loading: countriesLoading, error: countriesError, detectedCountry, retry: retryCountries } = useCountries();
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');

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
    selectedMethod !== null &&
    selection !== null;

  const handleCountryChange = useCallback((code: string) => {
    setCountry(code);
    setPhone('');
    setSelectedMethod(null);
    onCountryChange?.(code);
  }, [onCountryChange]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }, []);

  const handleMethodSelect = useCallback((method: PaymentMethod) => {
    setSelectedMethod(method);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setPaymentState('processing');

    setTimeout(() => {
      setPaymentState('success');
      setTimeout(() => {
        setPaymentState('idle');
        setCountry('');
        setPhone('');
        setSelectedMethod(null);
      }, 3000);
    }, 2000);
  }, [isFormValid]);

  useEffect(() => {
    setPaymentState('idle');
  }, [selection]);

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

        <form className="kiss-form" id="paymentForm" onSubmit={handleSubmit}>
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
              disabled={!isFormValid || paymentState !== 'idle'}
            >
              {paymentState === 'processing' ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Traitement en cours...
                </>
              ) : paymentState === 'success' ? (
                <>
                  <i className="fa-solid fa-check-circle" />
                  Paiement réussi !
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock" />
                  Payer maintenant
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
