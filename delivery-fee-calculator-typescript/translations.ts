import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { 'welcome_message': 'Welcome to React' } },
      fr: { translation: { 'welcome_message': 'Bienvenue à React' } },
      // Add more languages here
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
