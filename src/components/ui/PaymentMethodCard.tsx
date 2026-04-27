import { useTranslation } from '../../hooks/useTranslation';
import type { PaymentMethod } from '../../services/paymentMethodsApi';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentMethodCard({ method, isSelected, onSelect }: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      className={`payment-method ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onSelect(method)}
      aria-pressed={isSelected}
      aria-label={`${method.name}`}
    >
      <div className="payment-method__logo">
        <img src={method.logo_url} alt={method.name} />
      </div>
      <span className="payment-method__name">{method.name}</span>
      {isSelected && (
        <span className="payment-method__check">
          <i className="fa-solid fa-check" />
        </span>
      )}
    </button>
  );
}

interface PaymentMethodsListProps {
  methods: PaymentMethod[];
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function PaymentMethodsList({
  methods,
  selectedMethod,
  onSelect,
  loading,
  error,
  onRetry,
}: PaymentMethodsListProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="payment-methods">
        <div className="payment-methods__grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="payment-method payment-method--skeleton">
              <div className="payment-method__logo skeleton" />
              <div className="payment-method__name skeleton" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-methods">
        <div className="payment-methods__error">
          <span>{error}</span>
          <button type="button" onClick={onRetry} className="kiss-form__retry">
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  if (methods.length === 0) {
    return (
      <div className="payment-methods">
        <div className="payment-methods__empty">
          <i className="fa-solid fa-credit-card" />
          <span>{t('paymentMethod.unavailable')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-methods">
      <div className="payment-methods__grid">
        {methods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            isSelected={selectedMethod?.id === method.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}