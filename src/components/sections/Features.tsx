import { useState } from 'react';
import { Reveal } from '../ui';
import { features } from '../../constants/features';

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="features" id="fonctionnalites">
      <div className="features__inner">
        <div className="features__left">
          <Reveal>
            <h2>Quelques fonctionnalités</h2>
            <p>
              Découvrez toutes les fonctionnalités qui font de Shokii l&apos;application
              de rencontres incontournable du moment.
            </p>
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
