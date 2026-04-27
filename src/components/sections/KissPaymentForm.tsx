import { useState, useCallback, useEffect } from 'react';
import { formatNumber } from '../../lib/format';
import { Reveal } from '../ui/Reveal';
import { CountrySelect } from '../ui/CountrySelect';
import { PaymentMethodsList } from '../ui/PaymentMethodCard';
import { UserInfo, SessionError } from '../ui/SessionStatus';
import { useCountries } from '../../hooks/useCountries';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import { usePaymentPolling } from '../../hooks/usePaymentPolling';
import { useTranslation } from '../../hooks/useTranslation';
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
  const { t } = useTranslation();
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
  const phonePlaceholder = selectedCountry ? `${selectedCountry.flag} ${t('kiss.payment.phonePlaceholder')}` : 'XX XX XX XX';

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

  const getPhoneError = (cleaned: string) => {
    if (!/^\d+$/.test(cleaned)) {
      return t('kiss.payment.phoneError.digits');
    } else if (cleaned.length < 6) {
      return t('kiss.payment.phoneError.tooShort');
    } else if (cleaned.length > 15) {
      return t('kiss.payment.phoneError.tooLong');
    }
    return null;
  };

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\s/g, '');
    setPhone(value);

    if (cleaned.length > 0) {
      setPhoneError(getPhoneError(cleaned));
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
          <span>{t('kiss.paymentStatus.initializing')}</span>
        </div>
      );
    }

    if (status === 'verifying') {
      return (
        <div className="payment-status payment-status--verifying">
          <div className="payment-status__spinner">
            <i className="fa-solid fa-circle-notch fa-spin" />
          </div>
          <span>{t('kiss.paymentStatus.verifying')}</span>
          <span className="payment-status__hint">{t('kiss.paymentStatus.verifyingHint')}</span>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className="payment-status payment-status--success">
          <div className="payment-status__icon">
            <i className="fa-solid fa-check-circle" />
          </div>
          <h3>{t('kiss.paymentStatus.success')}</h3>
          <p>{t('kiss.paymentStatus.successText')}</p>
          {selection && (
            <div className="payment-status__amount">
              <span className="payment-status__kiss">{formatNumber(selection.kiss)}</span>
              <span className="payment-status__label">{t('kiss.paymentStatus.kissAdded')}</span>
            </div>
          )}
          <p className="payment-status__hint">{t('kiss.paymentStatus.successHint')}</p>
          <a href="/" className="btn btn--gradient payment-status__close">
            {t('kiss.paymentStatus.successClose')}
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
          <h3>{t('kiss.paymentStatus.failed')}</h3>
          <p>{paymentError || t('kiss.paymentStatus.failedText')}</p>
          <button
            type="button"
            className="btn btn--secondary payment-status__retry"
            onClick={reset}
          >
            {t('kiss.paymentStatus.retry')}
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
          <h3>{t('kiss.paymentStatus.timeout')}</h3>
          <p>{paymentError || t('kiss.paymentStatus.timeoutText')}</p>
          <div className="payment-status__actions">
            <button
              type="button"
              className="btn btn--gradient"
              onClick={reverify}
            >
              {t('kiss.paymentStatus.reverify')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="kiss-form__row">
          <div className="kiss-form__group">
            <label>{t('kiss.payment.country')}</label>
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
            <label htmlFor="phone">{t('kiss.payment.phone')}</label>
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
            <label>{t('kiss.payment.paymentMethod')}</label>
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
          <h3>{t('kiss.payment.summary')}</h3>
          <div className="kiss-form__summary-row">
            <span>{t('kiss.payment.planSelected')}</span>
            <span id="summaryPlan">{selection?.label ?? '—'}</span>
          </div>
          <div className="kiss-form__summary-row">
            <span>{t('kiss.payment.kissQuantity')}</span>
            <span id="summaryKiss">
              {selection ? `${formatNumber(selection.kiss)}` : '—'}
            </span>
          </div>
          <div className="kiss-form__summary-row kiss-form__summary-total">
            <span>{t('kiss.payment.total')}</span>
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
            {t('kiss.payment.submit')}
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
            {t('kiss.payment.title')}
          </h2>
        </Reveal>
        <Reveal>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            {t('kiss.payment.subtitle')}
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
