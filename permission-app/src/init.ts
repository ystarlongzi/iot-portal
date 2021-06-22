import { getI18n } from 'react-i18next';
import { configMethod } from '@tuya/connector';
import { message } from 'antd';
import _JSXStyle from 'styled-jsx/style';
import { mainHistory } from './index';

// 将jsxstyle导出为全局变量
if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle });
}

const init = () => {
  const msgWhiteList = ['removeRole'];
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
