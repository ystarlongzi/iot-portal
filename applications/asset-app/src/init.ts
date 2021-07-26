import { getI18n } from 'react-i18next';
import { configMethod } from '@tuya/connector';
import { message } from 'antd';
import { mainHistory } from './index';

const init = () => {
  const msgWhiteList = ['getDevicesInfoByAssetId'];
  const i18n = getI18n();
  const locale = i18n.language;
  if (locale === 'zh-CN') {
    i18n.changeLanguage(locale);
  } else {
    i18n.changeLanguage('en-US');
  }

  configMethod.initGlobalConfig({
    headers: {
      'Accept-Language': locale === 'zh-CN' ? locale : 'en-US',
    },
    baseURL: '/api',
    onError: (errorObj) => {
      const { code, msg, apiMethodName } = errorObj;

      if (code === '1010' || code === '111') {
        localStorage.removeItem('_USERNAME');
        localStorage.removeItem('_UID');
        localStorage.removeItem('_ROLE_TYPE');
        // history.push('/login');
        window.location.replace('/login');
        // setTimeout(() => {
        //   window.location.replace('/login');
        // }, 200);
        return;
      }

      // 需屏蔽的方法
      if (msgWhiteList.includes(apiMethodName)) {
        return;
      }

      message.error(msg);
    },
  });
};

export default init;
