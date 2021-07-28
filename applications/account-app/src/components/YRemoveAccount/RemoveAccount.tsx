import { useState } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { apiService } from '@tuya/connector';

export interface IProps {
  uids: string[];
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  isBatch?: boolean;
}

const RemoveAccountModal = ({
  visible,
  onCancel,
  onOk,
  uids,
  isBatch = false,
}: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      destroyOnClose
      visible={visible}
      title={isBatch ? t('removeAccount.multiTitle') : t('removeAccount.title')}
      onCancel={onCancel}
      onOk={() => {
        setLoading(true);
        if (!isBatch) {
          return apiService
            .removeAccount(uids[0])
            .then(() => {
              setLoading(false);
              onOk();
            })
            .catch(() => {
              setLoading(false);
            });
        }
        return apiService
          .batchRemoveAccount(uids)
          .then(() => {
            setLoading(false);
            onOk();
          })
          .catch(() => {
            setLoading(false);
          });
      }}
      confirmLoading={loading}
    >
      <span>
        {!isBatch
          ? t('removeAccount.content')
          : t('removeAccount.multiContent')}
      </span>
    </Modal>
  );
};

export default RemoveAccountModal;
