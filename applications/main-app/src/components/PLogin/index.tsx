import { apiService } from '@tuya/connector';

import BLogin from '@/components/BLogin';

import { EmailFormField } from '@/components/BLogin/component/EmailForm';
import { TeleFormField } from '@/components/BLogin/component/TeleForm';
import BLayoutLogin from '../BLayoutLogin';
import { message } from 'antd';
// import { message } from 'antd';


const PLogin = () => {
  const afterLogin = (userToken, userName) => {
    const { nickName, token, userId, role_type } = userToken;

    localStorage.setItem('_USERNAME', userName);
    localStorage.setItem('_UID', userId);
    try {
      const roleTypeStr = role_type[0];
      localStorage.setItem('_ROLE_TYPE', roleTypeStr);
    } catch (e) {
      console.error(e);
      localStorage.setItem('_ROLE_TYPE', '');
    }
    // token && history.push('/');
    window.location.replace('/');
  };

  const onEmailSubmit = (values: EmailFormField) => {
    apiService.multiLogin({
      userName: values.username,
      pwd: values.password,
    }).then((userToken) => {
      if (userToken && userToken.token) afterLogin(userToken, values.username);
    }).catch((e) => {
      // console.error(e);
      message.error(e.msg);
    });
  };

  const onTeleSubmit = (values: TeleFormField) => {
    apiService.multiLogin({
      countryCode: values.countryCode,
      phoneNum: values.phoneNum,
      pwd: values.password,
    })
    .then((userToken) => {
      // console.log(userToken);
      if (userToken && userToken.token) afterLogin(userToken, values.phoneNum);
    }).catch((e) => {
      // console.error(e);
      message.error(e.msg);
    });
  };

  return (
    <BLayoutLogin>
      <BLogin onEmailSubmit={onEmailSubmit} onTeleSubmit={onTeleSubmit} isLogin/>
    </BLayoutLogin>
  );
};

export default PLogin;
