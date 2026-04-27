import { Reveal, StoreButton } from '../ui';
import { useTranslation } from '../../hooks/useTranslation';

export function Download() {
  const { t } = useTranslation();

  return (
    <section className="download" id="download">
      <div className="container download__inner">
        <div className="download__content">
          <Reveal>
            <h2>{t('landing.download.title')}</h2>
            <p>{t('landing.download.subtitle')}</p>
            <div className="download__buttons">
              <StoreButton
                iconSrc="/assets/playstore.png"
                smallLabel={t('landing.download.availableOn')}
                mainLabel={t('landing.download.googlePlay')}
                href="#"
                aria-label={t('landing.download.downloadGooglePlay')}
                variant="light"
              />
              <StoreButton
                iconSrc="/assets/Apple_Store_logo.png"
                smallLabel={t('landing.download.downloadOn')}
                mainLabel={t('landing.download.appStore')}
                href="#"
                aria-label={t('landing.download.downloadAppStore')}
                variant="light"
              />
            </div>
          </Reveal>
        </div>

        <div className="download__visual">
          <Reveal>
            <img src="/assets/Group 25 (1).png" alt="Shokii sur mobile" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}