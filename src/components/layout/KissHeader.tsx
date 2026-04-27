import { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export function KissHeader() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`kiss-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="container kiss-header__inner">
        <a href="../" className="kiss-header__logo" aria-label={t('common.home')}>
          <img src="/assets/shokii.png" alt="Shokii" />
        </a>
        <a href="../" className="kiss-header__back">
          <i className="fa-solid fa-arrow-left"></i>
          <span>{t('kiss.header.back')}</span>
        </a>
      </div>
    </header>
  );
}