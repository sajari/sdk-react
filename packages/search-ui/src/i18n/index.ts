import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locale/en';

i18n.use(LanguageDetector).init({
  resources: {
    en,
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
});

export default i18n;
