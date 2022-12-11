import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uk from './uk';
import en from './en';

const resources = {
  uk,
  en,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uk',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
