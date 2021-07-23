import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './locale/de';
import en from './locale/en';
import es from './locale/es';
import fr from './locale/fr';
import it from './locale/it';
import nl from './locale/nl';

i18n.use(LanguageDetector).init({
  detection: {
    // we would want to look at html lang attr first
    order: ['htmlTag', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator'],
  },
  resources: {
    en,
    de,
    es,
    fr,
    nl,
    it,
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
