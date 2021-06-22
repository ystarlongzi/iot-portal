import { configMethod } from '@tuya/connector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en-US';
import zh from './zh-CN';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { 'en-US': en, 'zh-CN': zh },
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
  })
  .then((t) => {
    const title = t('menu.title.default');
    document.title = title;

    configMethod.setGlobalConfig({
      headers: {
        'Accept-Language': i18n.language === 'zh-CN' ? i18n.language : 'en-US',
      },
    });

    i18n.on('languageChanged', () => {
      const title = t('menu.title.default');
      document.title = title;

      configMethod.setGlobalConfig({
        headers: {
          'Accept-Language':
            i18n.language === 'zh-CN' ? i18n.language : 'en-US',
        },
      });
    });
  });

export default i18n;
