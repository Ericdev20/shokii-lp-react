import { Reveal } from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';

export function KissHero() {
  const { t } = useTranslation();

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="kiss-hero" id="top">
      <div className="container kiss-hero__inner">
        <div className="kiss-hero__content">
          <Reveal as="h1">
            {t('kiss.hero.title')}
          </Reveal>
          <Reveal>
            <p>
              {t('kiss.hero.description')}
            </p>
          </Reveal>
          <Reveal>
            <div className="kiss-hero__trust">
              <div className="kiss-hero__trust-item">
                <i className="fa-solid fa-shield-halved"></i>
                <span>{t('kiss.hero.trust.secure')}</span>
              </div>
              <div className="kiss-hero__trust-item">
                <i className="fa-solid fa-users"></i>
                <span>{t('kiss.hero.trust.users')}</span>
              </div>
              <div className="kiss-hero__trust-item">
                <i className="fa-solid fa-clock"></i>
                <span>{t('kiss.hero.trust.available')}</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <button onClick={scrollToPlans} className="btn btn--gradient kiss-hero__cta">
              {t('kiss.hero.cta')}
            </button>
          </Reveal>
        </div>
        <Reveal className="kiss-hero__visual">
          <img src="/assets/hero-pricing.png" alt="Illustration de KISS" className="kiss-hero__image" />
        </Reveal>
      </div>
    </section>
  );
}
