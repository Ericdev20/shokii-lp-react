import { useState, useCallback, useEffect } from 'react';
import { countries } from '../../constants/countries';
import { paymentMethods } from '../../constants/paymentMethods';
import { formatNumber } from '../../lib/format';
import { Reveal } from '../ui/Reveal';

interface PlanSelection {
  kiss: number;
  price: number;
  label: string;
}

interface KissPaymentFormProps {
  selection: PlanSelection | null;
}

type PaymentState = 'idle' | 'processing' | 'success';

export function KissPaymentForm({ selection }: KissPaymentFormProps) {
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');

  const selectedCountry = countries.find((c) => c.code === country);
  const dialCode = selectedCountry?.dialCode ?? '+229';
  const phonePlaceholder = selectedCountry?.phonePlaceholder ?? '01 00 00 00 00';

  const isFormValid =
    !!country &&
    phone.trim().length > 0 &&
    !!paymentMethod &&
    selection !== null;

  const handleCountryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  }, []);

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

    // Simulate payment processing: 2s spinner → 3s success → reset
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

  // Reset payment state when selection changes
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

        <form className="kiss-form" id="paymentForm" novalidate onSubmit={handleSubmit}>
          <div className="kiss-form__row">
            <div className="kiss-form__group">
              <label htmlFor="country">Pays</label>
              <select
                id="country"
                name="country"
                value={country}
                onChange={handleCountryChange}
                required
                aria-label="Sélectionne ton pays"
              >
                <option value="" disabled>
                  Sélectionne ton pays
                </option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="kiss-form__row">
            <div className="kiss-form__group">
              <label htmlFor="phone">Numéro de téléphone</label>
              <div className="kiss-form__phone">
                <span className="kiss-form__phone-code" id="phoneCode">
                  {dialCode}
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={phonePlaceholder}
                  required
                  aria-label="Numéro de téléphone"
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
