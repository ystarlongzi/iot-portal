import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { apiService } from '@tuya/connector';
import { message } from 'antd';

import BLayoutLogin from '../BLayoutLogin';
import { EmailFormField } from '@/components/BLogin/component/EmailForm';
import { TeleFormField } from '@/components/BLogin/component/TeleForm';
import BLogin from '../BLogin';

const PResetPwd = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const clearLocalToken = () => {
    localStorage.removeItem('_USERNAME');
    localStorage.removeItem('_UID');
    localStorage.removeItem('_ROLE_TYPE');
    document.cookie = `token=''; expire=${new Date(0).toUTCString()}; path=/`;
    setTimeout(() => {
      history.replace('/login');
    }, 100);
  };

  const onEmailSubmit = (values: EmailFormField) => {
    console.log(values);
    apiService
      .forgetPassword({
        mail: values.username,
        code: values.validateCode,
        newPassword: values.password,
      })
      .then((res) => {
        if (res && typeof res === 'boolean') {
          message.success(t('login.resetPwdSuccess')).then(() => {
            clearLocalToken();
          });
        }
      });
  };

  const onTeleSubmit = (values: TeleFormField) => {
    apiService
      .forgetPassword({
        countryCode: values.countryCode,
        phone: values.phoneNum,
        newPassword: values.password,
        code: values.validateCode,
      })
      .then((res) => {
        if (res && typeof res === 'boolean') {
          message.success(t('login.resetPwdSuccess')).then(() => {
            clearLocalToken();
          });
        }
      });
  };

  return (
    <BLayoutLogin>
      <BLogin
        onEmailSubmit={onEmailSubmit}
        onTeleSubmit={onTeleSubmit}
        isLogin={false}
      />
    </BLayoutLogin>
  );
};

export default PResetPwd;
