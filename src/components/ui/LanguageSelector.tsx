import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface LanguageSelectorProps {
  className?: string;
  flagsOnly?: boolean;
}

export function LanguageSelector({ className = '', flagsOnly = false }: LanguageSelectorProps) {
  const { currentLocale, changeLanguage, availableLocales } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (locale: string) => {
    changeLanguage(locale);
    setIsOpen(false);
  };

  const currentLocaleData = availableLocales.find(l => l.code === currentLocale);

  return (
    <div
      ref={containerRef}
      className={`language-selector ${flagsOnly ? 'language-selector--flags-only' : ''} ${className}`}
    >
      <button
        className="language-selector__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Sélectionner la langue"
        aria-expanded={isOpen}
      >
        {currentLocaleData?.flag}
        {!flagsOnly && currentLocaleData?.name}
      </button>

      {isOpen && (
        <div className="language-selector__dropdown">
          {availableLocales.map((locale) => (
            <button
              key={locale.code}
              className={`language-selector__option ${locale.code === currentLocale ? 'is-active' : ''}`}
              onClick={() => handleSelect(locale.code)}
            >
              {locale.flag}
              {!flagsOnly && locale.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
