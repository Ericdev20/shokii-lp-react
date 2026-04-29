import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { mainNavItems } from '../../constants/nav';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector } from '../ui/LanguageSelector';

const SECTION_IDS = mainNavItems
  .filter(item => item.href.startsWith('#'))
  .map(item => item.href.replace('#', ''));

export function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        navRef.current &&
        burgerRef.current &&
        !navRef.current.contains(e.target as Node) &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isMenuOpen, closeMenu]);

  const getNavLabel = (index: number): string => {
    const keys = ['nav.home', 'nav.about', 'nav.howItWorks', 'nav.testimonials', 'nav.pricing', 'nav.contact'];
    return t(keys[index]);
  };

  return (
    <header className={`header${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}>
      <div className="container header__inner">
        <a href="/#accueil" className="header__logo">
          <img src="/assets/shokii.png" alt="Shokii" />
        </a>

        <nav
          ref={navRef}
          className={`header__nav${isMenuOpen ? ' is-open' : ''}`}
          aria-label={t('nav.home')}
        >
          <ul>
            {mainNavItems.map((item, index) => (
              <li key={item.href}>
                {item.isExternal ? (
                  <Link
                    to={item.href}
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    {getNavLabel(index)}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`nav-link${activeSection === item.href.replace('#', '') ? ' active' : ''}`}
                    onClick={closeMenu}
                  >
                    {getNavLabel(index)}
                  </a>
                )}
              </li>
            ))}
            <li className="nav-mobile-cta">
              <a href="/#download" className="btn btn--gradient">
                {t('header.download')}
              </a>
            </li>
            <li className="nav-mobile-lang">
              <LanguageSelector flagsOnly />
            </li>
          </ul>
        </nav>

        <div className="header__actions">

          <div className="header__actions">
          
            <LanguageSelector flagsOnly className="header__lang-select" />
            
            <a href="/#download" className="btn btn--gradient header__cta">
              {t('header.download')}
            </a>
          </div>
      


          <button
            ref={burgerRef}
            className={`header__burger${isMenuOpen ? ' is-active' : ''}`}
            aria-label={isMenuOpen ? t('header.menuClose') : t('header.menuOpen')}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        
      </div>
    </header>
  );
}