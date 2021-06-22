import { useState } from 'react';
import { message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiService } from '@tuya/connector';

export interface IProps {
  roleCode: string;
  visible: boolean;
  onOk: (needRefresh: boolean) => void;
}

const RemoveRoleModal = ({ visible, onOk, roleCode }: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      destroyOnClose
      confirmLoading={loading}
      visible={visible}
      title={t('removeModal.title')}
      okText={t('removeModal.okText')}
      onCancel={() => {
        onOk(false);
      }}
      onOk={() => {
        setLoading(true);
        apiService
          .removeRole(roleCode)
          .then((res) => {
            setLoading(false);
            if (res) {
              onOk(true);
              return;
            }
          })
          .catch((e) => {
            setLoading(false);
            if (e.code === 'e-1108') {
              Modal.info({
                okText: t('removeModal.confirmBtn'),
                content: t('removeModal.confirmContent'),
                onOk: () => {
                  onOk(false);
                },
              });
              return;
            }
            message.error(e.msg);
          });
      }}
    >
      <span>{t('removeModal.content')}</span>
    </Modal>
  );
};

export default RemoveRoleModal;
