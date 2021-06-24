import { apiService } from '@tuya/connector';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import ModalForm from '../BModalForm';

interface IProps {
  visible: boolean;
  nickName: string;
  userId: string;
  onFinish: (needFresh: boolean) => void;
}

const EditUserName = ({ userId, visible, nickName, onFinish }: IProps) => {
  const { t } = useTranslation();

  return (
    <ModalForm
      modalStatus={visible}
      title={t('editUserName.title')}
      onConfirm={(value) => {
        return new Promise(() => {});
        // return apiService
        //   .editAccountName(userId, value.nickName)
        //   .then(() => {
        //     onFinish(true);
        //     return true;
        //   })
        //   .catch(() => {
        //     return false;
        //   });
      }}
      onCancel={() => {
        onFinish(false);
      }}
    >
      <Form.Item name="nickName" initialValue={nickName}>
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default EditUserName;
