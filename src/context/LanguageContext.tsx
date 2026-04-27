import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import fr from '../locales/fr.json';
import en from '../locales/en.json';

type Translations = typeof fr;

const translations: Record<string, Translations> = {
  fr,
  en,
};

const STORAGE_KEY = 'shokii_language';

type AvailableLocale = {
  code: string;
  name: string;
  flag: string;
};

const availableLocales: AvailableLocale[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

interface LanguageContextType {
  currentLocale: string;
  changeLanguage: (locale: string) => void;
  availableLocales: AvailableLocale[];
  t: (key: string) => string;
  isFrench: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLocale(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'fr' || stored === 'en')) {
      return stored;
    }
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr' || browserLang === 'en') {
      return browserLang;
    }
  }
  return 'fr';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<string>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLocale);
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  const changeLanguage = useCallback((locale: string) => {
    if (translations[locale]) {
      setCurrentLocale(locale);
    }
  }, []);

  const t = useCallback((key: string): string => {
    const translation = getNestedValue(translations[currentLocale], key);
    if (translation !== undefined) {
      return translation;
    }
    const fallback = getNestedValue(translations['fr'], key);
    return fallback !== undefined ? fallback : key;
  }, [currentLocale]);

  const value: LanguageContextType = {
    currentLocale,
    changeLanguage,
    availableLocales,
    t,
    isFrench: currentLocale === 'fr',
    isEnglish: currentLocale === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}