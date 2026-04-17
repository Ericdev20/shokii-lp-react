import { KissHeader } from './components/layout/KissHeader';
import { KissFooter } from './components/layout/KissFooter';
import { KissHero } from './components/sections/KissHero';
import { KissWhyBuy } from './components/sections/KissWhyBuy';
import { KissPlans } from './components/sections/KissPlans';
import { KissPaymentForm } from './components/sections/KissPaymentForm';
import { KissReassurance } from './components/sections/KissReassurance';
import { usePaymentSession } from './hooks/usePaymentSession';
import { parseKissParams } from './hooks/useKissParams';
import { useState, useCallback, useRef, useMemo } from 'react';
import type { PlanSelection } from './components/sections/KissPlans';

export function KissPage() {
  const session = usePaymentSession();
  const [selection, setSelection] = useState<PlanSelection | null>(null);
  const paymentRef = useRef<HTMLElement | null>(null);

  const urlParams = useMemo(() => parseKissParams(), []);
  
  const initialCustomQty = urlParams.amount ? Math.floor(urlParams.amount / 200) : undefined;
  const initialPackId = urlParams.abonnementId || undefined;

  const handleSelectionChange = useCallback((s: PlanSelection) => {
    setSelection(s);
  }, []);

  const handleCountryChange = useCallback((countryCode: string) => {
    console.log('Pays sélectionné:', countryCode);
  }, []);

  const handleScrollToPayment = useCallback(() => {
    const el = document.getElementById('payment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <KissHeader />
      <main>
        <KissHero />
        <KissWhyBuy />
        <KissPlans
          onSelectionChange={handleSelectionChange}
          onScrollToPayment={handleScrollToPayment}
          initialPackId={initialPackId}
          initialCustomQty={initialCustomQty}
        />
        <section ref={paymentRef as React.RefObject<HTMLElement | null>}>
          <KissPaymentForm 
            selection={selection} 
            user={session.user}
            sessionValid={session.valid}
            sessionError={session.error}
            onCountryChange={handleCountryChange}
          />
        </section>
        <KissReassurance />
      </main>
      <KissFooter />
    </>
  );
}
