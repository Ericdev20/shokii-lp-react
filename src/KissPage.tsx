import { KissHeader } from './components/layout/KissHeader';
import { KissFooter } from './components/layout/KissFooter';
import { KissHero } from './components/sections/KissHero';
import { KissWhyBuy } from './components/sections/KissWhyBuy';
import { KissPlans } from './components/sections/KissPlans';
import { KissPaymentForm } from './components/sections/KissPaymentForm';
import { KissReassurance } from './components/sections/KissReassurance';
import { SessionLoading, SessionError } from './components/ui/SessionStatus';
import { usePaymentSession } from './hooks/usePaymentSession';
import { useState, useCallback, useRef } from 'react';
import type { PlanSelection } from './components/sections/KissPlans';

export function KissPage() {
  const session = usePaymentSession();
  const [selection, setSelection] = useState<PlanSelection | null>(null);
  const paymentRef = useRef<HTMLElement | null>(null);

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
        {session.loading ? (
          <SessionLoading />
        ) : session.error ? (
          <SessionError message={session.error} />
        ) : (
          <>
            <KissHero />
            <KissWhyBuy />
            <KissPlans
              onSelectionChange={handleSelectionChange}
              onScrollToPayment={handleScrollToPayment}
            />
            <section ref={paymentRef as React.RefObject<HTMLElement | null>}>
              <KissPaymentForm 
                selection={selection} 
                user={session.user}
                onCountryChange={handleCountryChange}
              />
            </section>
            <KissReassurance />
          </>
        )}
      </main>
      <KissFooter />
    </>
  );
}
