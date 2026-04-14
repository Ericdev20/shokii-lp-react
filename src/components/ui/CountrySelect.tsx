import { useState, useRef, useEffect, useCallback } from 'react';
import type { Country } from '../../hooks/useCountries';

interface CountrySelectProps {
  countries: Country[];
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function CountrySelect({
  countries,
  value,
  onChange,
  disabled,
  error,
  onRetry,
}: CountrySelectProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedCountry = countries.find((c) => c.code === value);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = useCallback((code: string) => {
    onChange(code);
    setSearch('');
    setIsOpen(false);
    setHighlightedIndex(0);
  }, [onChange]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      setSearch('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, filteredCountries.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleSelect(filteredCountries[highlightedIndex].code);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearch('');
        break;
    }
  };

  if (disabled) {
    return (
      <div className="kiss-form__select-skeleton">
        <span className="skeleton-text">Chargement des pays...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kiss-form__error">
        <span>{error}</span>
        {onRetry && (
          <button type="button" onClick={onRetry} className="kiss-form__retry">
            Réessayer
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="country-select" ref={containerRef}>
      <button
        type="button"
        className={`country-select__trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) inputRef.current?.focus();
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sélectionner un pays"
      >
        {selectedCountry ? (
          <>
            <span className="country-select__flag">{selectedCountry.flag}</span>
            <span className="country-select__name">{selectedCountry.name}</span>
          </>
        ) : (
          <span className="country-select__placeholder">Sélectionner un pays</span>
        )}
        <i className={`fa-solid fa-chevron-down country-select__arrow ${isOpen ? 'is-open' : ''}`} />
      </button>

      {isOpen && (
        <div className="country-select__dropdown">
          <div className="country-select__search">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher un pays..."
              autoFocus
              aria-label="Rechercher un pays"
            />
          </div>
          <ul
            ref={listRef}
            className="country-select__list"
            role="listbox"
            aria-label="Liste des pays"
          >
            {filteredCountries.length === 0 ? (
              <li className="country-select__empty">Aucun pays trouvé</li>
            ) : (
              filteredCountries.map((country, index) => (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={country.code === value}
                  className={`country-select__option ${index === highlightedIndex ? 'is-highlighted' : ''} ${country.code === value ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(country.code)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className="country-select__flag">{country.flag}</span>
                  <span className="country-select__option-name">{country.name}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
