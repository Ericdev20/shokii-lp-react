import { useState } from 'react';
import { footerNavItems } from '../../constants/nav';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector, AppStoreModal } from '../ui';

export function Footer() {
  const { t } = useTranslation();
  const [isAppStoreModalOpen, setIsAppStoreModalOpen] = useState(false);

  const handleAppStoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAppStoreModalOpen(true);
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <h4>{t('footer.help.usefulLinks')}</h4>
          <ul>
            {footerNavItems.map((item, index) => {
              const keys = ['footer.nav.home', 'footer.nav.about', 'footer.nav.howItWorks', 'footer.nav.testimonials', 'footer.nav.contact'];
              return (
                <li key={item.href}>
                  <a href={item.href}>{t(keys[index])}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="footer__col">
          <h4>{t('footer.help.title')}</h4>
          <ul>
            <li><a target="_blank" href="https://shokii.com/legal-notice">{t('footer.help.legal')}</a></li>
            <li><a target="_blank" href="https://shokii.com/faq">{t('footer.help.faq')}</a></li>
            <li><a target="_blank" href="https://shokii.com/privacy-policy">{t('footer.privacy')}</a></li>
            <li><a target="_blank" href="https://shokii.com/terms-of-use">{t('footer.terms')}</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>{t('footer.contactUs')}</h4>
          <ul>
            <li>
              <a href="mailto:contact@shokii.com">contact@shokii.com</a>
            </li>
            <li>
              <a href="tel:+2290152165555">+229 01 52 16 55 55</a>
            </li>
          </ul>
          <div className="footer__stores">
            <a
              href="https://play.google.com/store/apps/details?id=com.shokii_app.app"
              className="footer__store-btn"
              aria-label={t('footer.downloadGooglePlay')}
            >
              <img src="/assets/playstore.png" alt="" aria-hidden="true" />
              <span>
                <small>{t('footer.availableOn')}</small>
                Google Play
              </span>
            </a>
            <a
              href="#"
              className="footer__store-btn"
              onClick={handleAppStoreClick}
              aria-label={t('footer.downloadAppStore')}
            >
              <img src="/assets/Apple_Store_logo.png" alt="" aria-hidden="true" />
              <span>
                <small>{t('footer.downloadOn')}</small>
                App Store
              </span>
            </a>
          </div>
        </div>

        <div className="footer__col footer__col--language mb-3">
          <LanguageSelector />
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <img src="/assets/shokii.png" alt="Shokii" className="footer__logo" />
          <p>&copy; 2026 Shokii. {t('footer.copyright')}</p>
        </div>
      </div>

      <AppStoreModal
        isOpen={isAppStoreModalOpen}
        onClose={() => setIsAppStoreModalOpen(false)}
      />
    </footer>
  );
}