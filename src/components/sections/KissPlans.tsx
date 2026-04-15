import { useState, useCallback } from 'react';
import { formatNumber } from '../../lib/format';
import { Reveal } from '../ui/Reveal';
import { SkeletonPlanCard } from '../ui/Skeleton';
import { usePackAbonnement } from '../../hooks/usePackAbonnement';
import { CUSTOM_PRICE_PER_KISS } from '../../constants/kissConfig';

export interface PlanSelection {
  id: string;
  kiss: number;
  price: number;
  label: string;
}

interface KissPlansProps {
  onSelectionChange: (selection: PlanSelection) => void;
  onScrollToPayment: () => void;
}

export function KissPlans({ onSelectionChange, onScrollToPayment }: KissPlansProps) {
  const { packs, loading, error, retry } = usePackAbonnement();
  const [selectedPlan, setSelectedPlan] = useState<PlanSelection | null>(null);
  const [customQty, setCustomQty] = useState<number>(0);
  const customTotal = customQty * CUSTOM_PRICE_PER_KISS;

  const handlePlanSelect = useCallback((plan: PlanSelection) => {
    setSelectedPlan(plan);
    onSelectionChange(plan);
    onScrollToPayment();
  }, [onSelectionChange, onScrollToPayment]);

  const handleCustomQtyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const qty = isNaN(val) ? 0 : Math.max(0, val);
    setCustomQty(qty);
  }, []);

  const handleCustomBuy = useCallback(() => {
    if (customQty > 0) {
      const selection: PlanSelection = {
        id: 'custom',
        kiss: customQty,
        price: customTotal,
        label: `${formatNumber(customQty)} KISS (libre)`,
      };
      setSelectedPlan(selection);
      onSelectionChange(selection);
      onScrollToPayment();
    }
  }, [customQty, customTotal, onSelectionChange, onScrollToPayment]);

  const handlePlanBuy = useCallback((plan: { id: string; kiss: number; price: number }) => {
    const selection: PlanSelection = {
      id: plan.id,
      kiss: plan.kiss,
      price: plan.price,
      label: `${formatNumber(plan.kiss)} KISS`,
    };
    setSelectedPlan(selection);
    onSelectionChange(selection);
    onScrollToPayment();
  }, [onSelectionChange, onScrollToPayment]);

  return (
    <section className="kiss-plans" id="plans">
      <div className="container">
        <Reveal>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Choisis ton pack de KISS
          </h2>
        </Reveal>
        <Reveal>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Sélectionne le pack qui te convient et passe au paiement.
          </p>
        </Reveal>

        {loading ? (
          <div className="kiss-plans__grid">
            <SkeletonPlanCard />
            <SkeletonPlanCard hasBadge />
            <SkeletonPlanCard hasBadge />
          </div>
        ) : error ? (
          <div className="kiss-error">
            <p className="kiss-error__message">{error}</p>
            <button
              className="btn btn--gradient kiss-error__retry"
              type="button"
              onClick={retry}
            >
              Réessayer
            </button>
          </div>
        ) : packs.length === 0 ? (
          <div className="kiss-empty">
            <p>Aucun pack disponible pour le moment.</p>
          </div>
        ) : (
          <div className="kiss-plans__grid">
            {packs.map((plan) => {
              const isSelected = selectedPlan?.kiss === plan.kiss && selectedPlan?.price === plan.price;
              let planClass = 'kiss-plan';
              if (plan.badge === 'popular') planClass += ' kiss-plan--popular';
              if (plan.badge === 'best') planClass += ' kiss-plan--best';
              if (isSelected) planClass += ' is-selected';

              return (
                <Reveal
                  key={plan.id}
                  className={planClass}
                  onClick={() => handlePlanSelect({
                    id: plan.id,
                    kiss: plan.kiss,
                    price: plan.price,
                    label: `${formatNumber(plan.kiss)} KISS`,
                  })}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Pack ${formatNumber(plan.kiss)} KISS pour ${formatNumber(plan.price)} FCFA`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePlanSelect({
                        id: plan.id,
                        kiss: plan.kiss,
                        price: plan.price,
                        label: `${formatNumber(plan.kiss)} KISS`,
                      });
                    }
                  }}
                >
                  <div className="kiss-plan__inner">
                    {plan.badge === 'popular' && (
                      <div className="kiss-plan__badge">POPULAIRE</div>
                    )}
                    {plan.badge === 'best' && (
                      <div className="kiss-plan__badge kiss-plan__badge--gold">POPULAIRE</div>
                    )}
                    <div className="kiss-plan__duree">Valable {plan.duree}</div>
                    <div className="kiss-plan__quantity">{formatNumber(plan.kiss)}</div>
                    <div className="kiss-plan__label">KISS</div>
                    <div className="kiss-plan__price">
                      <span className="kiss-plan__amount">{formatNumber(plan.price)}</span>
                      <span className="kiss-plan__currency">FCFA</span>
                    </div>
                    <div
                      className="kiss-plan__desc"
                      dangerouslySetInnerHTML={{ __html: plan.description }}
                    />
                    {plan.benefits && (
                      <div
                        className="kiss-plan__benefits"
                        dangerouslySetInnerHTML={{ __html: plan.benefits }}
                      />
                    )}
                    <button
                      className="btn btn--gradient kiss-plan__btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanBuy(plan);
                      }}
                    >
                      Acheter
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        <Reveal className="kiss-custom">
          <div className="kiss-custom__inner">
            <div className="kiss-custom__info">
              <i className="fa-solid fa-coins"></i>
              <div>
                <h3>Achat libre</h3>
                <p>Choisis ta quantité. <strong>{formatNumber(CUSTOM_PRICE_PER_KISS)} FCFA / KISS</strong></p>
              </div>
            </div>
            <div className="kiss-custom__input">
              <input
                type="number"
                min="1"
                placeholder="Quantité"
                value={customQty || ''}
                onChange={handleCustomQtyChange}
                aria-label="Quantité de KISS"
              />
              <span className="kiss-custom__total">
                {formatNumber(customTotal)} FCFA
              </span>
            </div>
            <button
              className="btn btn--gradient kiss-custom__btn"
              type="button"
              onClick={handleCustomBuy}
              disabled={customQty <= 0}
              aria-label="Acheter des KISS"
            >
              Acheter
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
