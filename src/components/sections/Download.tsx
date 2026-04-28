import { useState } from 'react';
import { Reveal, StoreButton, AppStoreModal } from '../ui';
import { useTranslation } from '../../hooks/useTranslation';

export function Download() {
  const { t } = useTranslation();
  const [isAppStoreModalOpen, setIsAppStoreModalOpen] = useState(false);

  const handleAppStoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAppStoreModalOpen(true);
  };

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
                href="https://play.google.com/store/apps/details?id=com.shokii_app.app"
                aria-label={t('landing.download.downloadGooglePlay')}
                variant="light"
              />
              <StoreButton
                iconSrc="/assets/pomme.png"
                smallLabel={t('landing.download.downloadOn')}
                mainLabel={t('landing.download.appStore')}
                href="#"
                onClick={handleAppStoreClick}
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

      <AppStoreModal
        isOpen={isAppStoreModalOpen}
        onClose={() => setIsAppStoreModalOpen(false)}
      />
    </section>
  );
}