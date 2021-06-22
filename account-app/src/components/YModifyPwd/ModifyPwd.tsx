// todo
import { apiService } from '@tuya/connector';
import { Form, Input, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import BAddUserTabForm from '../BAddUser';
import ModalForm from '../BModalForm';

interface IProps {
  visible: boolean;
  userName: string;
  onFinish: (needFresh: boolean) => void;
}

const ModifyPwd = ({ visible, userName, onFinish }: IProps) => {
  const { t } = useTranslation();

  return (
    <ModalForm
      nameList={['password']}
      modalStatus={visible}
      title={t('modifyPwd.title')}
      onConfirm={(value) => {
        const { password } = value;
        return apiService
          .editAccountPwd(userName, password)
          .then(() => {
            onFinish(true);
            return true;
          })
          .catch(() => {
            return false;
          });
      }}
      onCancel={() => {
        onFinish(false);
      }}
    >
      <BAddUserTabForm
        accountTypeDisabled
        showRoleSelector={false}
        userNameDisabled
        onValueChange={() => {}}
        formValues={{
          countryCode: '',
          accountType: userName.includes('@') ? 'email' : 'tele',
          userName,
          roleCode: '',
        }}
        roleList={[]}
      />
    </ModalForm>
  );
};

export default ModifyPwd;
