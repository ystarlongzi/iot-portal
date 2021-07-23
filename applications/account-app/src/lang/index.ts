import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en';
import zh from './zh';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { 'en-US': en, 'zh-CN': zh },
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
  });
