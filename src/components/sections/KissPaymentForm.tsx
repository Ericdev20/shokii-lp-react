import { useState, useCallback, useEffect } from 'react';
import { paymentMethods } from '../../constants/paymentMethods';
import { formatNumber } from '../../lib/format';
import { Reveal } from '../ui/Reveal';
import { CountrySelect } from '../ui/CountrySelect';
import { useCountries } from '../../hooks/useCountries';

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
  const { countries, loading, error, detectedCountry, retry } = useCountries();
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');

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
    !!paymentMethod &&
    selection !== null;

  const handleCountryChange = useCallback((code: string) => {
    setCountry(code);
    setPhone('');
    onCountryChange?.(code);
  }, [onCountryChange]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }, []);

  const handlePaymentMethodSelect = useCallback((methodId: string) => {
    setPaymentMethod(methodId);
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
        setPaymentMethod('');
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
                disabled={loading}
                error={error}
                onRetry={retry}
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
              <div className="kiss-form__methods" role="radiogroup" aria-label="Mode de paiement">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="kiss-form__method"
                    data-method={method.id}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => handlePaymentMethodSelect(method.id)}
                    />
                    <span className="kiss-form__method-inner">
                      <span
                        className={`kiss-form__method-logo ${method.logoClass}`}
                        dangerouslySetInnerHTML={{ __html: method.logoContent }}
                      />
                      <span className="kiss-form__method-name">{method.name}</span>
                    </span>
                  </label>
                ))}
              </div>
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
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Traitement en cours...
                </>
              ) : paymentState === 'success' ? (
                <>
                  <i className="fa-solid fa-check-circle"></i>
                  Paiement réussi !
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock"></i>
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
