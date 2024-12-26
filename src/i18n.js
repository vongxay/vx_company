import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: {
        translation: {
          menu: {
            home: "Home",
            about: "About Us",
            services: "Services",
            projects: "Projects",
            blogs: "Blogs",
            contact: "Contact",
            dashboard: "Dashboard"
          }
        }
      },
      lo: {
        translation: {
          menu: {
            home: "ໜ້າຫຼັກ",
            about: "ກ່ຽວກັບພວກເຮົາ",
            services: "ບໍລິການ",
            projects: "ໂຄງການ",
            blogs: "ບົດຄວາມ",
            contact: "ຕິດຕໍ່",
            dashboard: "ແຜງຄວບຄຸມ"
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 