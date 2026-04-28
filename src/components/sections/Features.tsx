import { useState } from 'react';
import { Reveal } from '../ui';
import { useTranslation } from '../../hooks/useTranslation';

export function Features() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  const features = [
    { title: t('landing.features.cards.0.title'), description: t('landing.features.cards.0.description'), icon: 'fa-solid fa-user' },
    { title: t('landing.features.cards.1.title'), description: t('landing.features.cards.1.description'), icon: 'fa-solid fa-heart' },
    { title: t('landing.features.cards.2.title'), description: t('landing.features.cards.2.description'), icon: 'fa-solid fa-magnifying-glass' },
    { title: t('landing.features.cards.3.title'), description: t('landing.features.cards.3.description'), icon: 'fa-solid fa-user-secret' },
    { title: t('landing.features.cards.4.title'), description: t('landing.features.cards.4.description'), icon: 'fa-solid fa-comments' },
    { title: t('landing.features.cards.5.title'), description: t('landing.features.cards.5.description'), icon: 'fa-solid fa-calendar-check' },
    { title: t('landing.features.cards.6.title'), description: t('landing.features.cards.6.description'), icon: 'fa-solid fa-ticket' },
    { title: t('landing.features.cards.7.title'), description: t('landing.features.cards.7.description'), icon: 'fa-solid fa-video' },
    { title: t('landing.features.cards.8.title'), description: t('landing.features.cards.8.description'), icon: 'fa-solid fa-star' },
  ];

  return (
    <section className="features" id="fonctionnalites">
      <div className="features__inner container">
        <div className="features__left">
          <Reveal>
            <h2>{t('landing.features.title')}</h2>
            <p>{t('landing.features.subtitle')}</p>
            <div className="features__mockups">
              <img src="/assets/match.png" alt="Mes Kiss" className="features__mockup-1" />
              <img src="/assets/msg.png" alt="Menu" className="features__mockup-2" />
            </div>
          </Reveal>
        </div>

        <div className="features__right">
          {features.map((feature, index) => (
            <Reveal key={index}>
              <div
                className={`feature-card${activeIndex === index ? ' active' : ''}`}
                data-accordion
              >
                <button
                  className="feature-card__trigger"
                  aria-expanded={activeIndex === index}
                  onClick={() => handleToggle(index)}
                >
                  <div className="feature-card__icon">
                    <i className={feature.icon}></i>
                  </div>
                  <span className="feature-card__title">{feature.title}</span>
                  <span className="feature-card__chevron" aria-hidden="true">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>
                <div
                  className="feature-card__content"
                  aria-hidden={activeIndex !== index}
                >
                  <p>{feature.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}