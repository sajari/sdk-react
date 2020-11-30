import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locale/en.json';

i18n.use(LanguageDetector).init({
  resources: {
    en,
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

export default i18n;
