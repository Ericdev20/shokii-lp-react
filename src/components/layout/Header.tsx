import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { mainNavItems } from '../../constants/nav';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const SECTION_IDS = mainNavItems
  .filter(item => item.href.startsWith('#'))
  .map(item => item.href.replace('#', ''));

export function Header() {
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

  // Close on click outside
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

  return (
    <header className={`header${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}>
      <div className="container header__inner">
        <a href="#accueil" className="header__logo">
          <img src="/assets/shokii.png" alt="Shokii" />
        </a>

        <nav
          ref={navRef}
          className={`header__nav${isMenuOpen ? ' is-open' : ''}`}
          aria-label="Navigation principale"
        >
          <ul>
            {mainNavItems.map((item) => (
              <li key={item.href}>
                {item.isExternal ? (
                  <Link
                    to={item.href}
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`nav-link${activeSection === item.href.replace('#', '') ? ' active' : ''}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li className="nav-mobile-cta">
              <a href="https://shokii.com/signup" className="btn btn--gradient">
                Inscrivez-vous
              </a>
            </li>
          </ul>
        </nav>

        <a href="https://shokii.com/signup" className="btn btn--gradient header__cta">
          Inscrivez-vous
        </a>

        <button
          ref={burgerRef}
          className={`header__burger${isMenuOpen ? ' is-active' : ''}`}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
