import { Reveal } from '../ui';
import { useTranslation } from '../../hooks/useTranslation';
import { useAboutCards } from '../../constants/about';

export function About() {
  const { t } = useTranslation();
  const aboutCards = useAboutCards();

  return (
    <section className="about" id="a-propos">
      <div className="container about__inner">
        <div className="about__left">
          <Reveal>
            <h2 className="section-title">{t('landing.about.title')}</h2>
            <div className="about__text">
              <p>{t('landing.about.description1')}</p>
              <p>{t('landing.about.description2')}</p>
              <p>{t('landing.about.description3')}</p>
              <p>{t('landing.about.description4')}</p>
            </div>
          </Reveal>
        </div>

        <div className="about__right">
          <div className="about__cards">
            {aboutCards.map((card, index) => (
              <Reveal key={index} staggerDelay={index * 100} className="d-inline-grid">
                <div className="about-card">
                  <div className="about-card__icon">
                    <img src={card.icon} alt="" aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}