import { Reveal, StoreButton } from '../ui';
import { useTranslation } from '../../hooks/useTranslation';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="accueil">
      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal>
            <h1>
              {t('landing.hero.title')}<br />
              <span className="gradient-text">{t('landing.hero.titleLine2')}</span>
            </h1>
            <p>
              {t('landing.hero.subtitle')}
            </p>
          </Reveal>
        </div>

        <div className="hero__visual">
          <div className="hero__ellipse" aria-hidden="true">
            <img src="/assets/Ellipse 1.png" alt="" />
          </div>
          <div className="hero__phones">
            <div>
              <img src="/assets/feat1.png" alt="Application Shokii sur un téléphone" className="hero__phone-1" />
            </div>
            <div>
              <img src="/assets/feat2.png" alt="Application Shokii sur un deuxième téléphone" className="hero__phone-2" />
            </div>
          </div>
        </div>

        <div className="hero__buttons">
          <StoreButton
            iconSrc="/assets/playstore.png"
            smallLabel={t('landing.hero.availableOn')}
            mainLabel={t('landing.hero.googlePlay')}
            href="#"
            aria-label={t('landing.hero.downloadGooglePlay')}
          />
          <StoreButton
            iconSrc="/assets/Apple_Store_logo.png"
            smallLabel={t('landing.hero.downloadOn')}
            mainLabel={t('landing.hero.appStore')}
            href="#"
            aria-label={t('landing.hero.downloadAppStore')}
          />
        </div>
      </div>
    </section>
  );
}