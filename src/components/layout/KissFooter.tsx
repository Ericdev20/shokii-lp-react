import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector } from '../ui/LanguageSelector';

export function KissFooter() {
  const { t } = useTranslation();

  return (
    <footer className="kiss-footer">
      <div className="container kiss-footer__inner">
        <div className="kiss-footer__links">
          <Link to="/">{t('common.home')}</Link>
          <a href="/#a-propos">{t('footer.about')}</a>
          <a href="#">{t('footer.privacy')}</a>
          <a href="#">{t('footer.terms')}</a>
        </div>
        <div className="kiss-footer__contact">
          <a href="mailto:contact@shokii.com">contact@shokii.com</a>
          <a href="tel:+2290152165555">+229 01 52 16 55 55</a>
        </div>
        <p className="kiss-footer__copy">&copy; 2026 Shokii. {t('footer.copyright')}</p>
        <LanguageSelector />
      </div>
    </footer>
  );
}