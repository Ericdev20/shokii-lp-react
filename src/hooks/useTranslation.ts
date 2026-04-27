import { useLanguage } from '../context/LanguageContext';

export function useTranslation() {
  const { currentLocale, changeLanguage, availableLocales, t, isFrench, isEnglish } = useLanguage();

  return {
    t,
    currentLocale,
    changeLanguage,
    availableLocales,
    isFrench,
    isEnglish,
  };
}