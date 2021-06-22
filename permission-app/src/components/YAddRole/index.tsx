import { apiService, role } from '@tuya/connector';
import { Form, Select, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModalForm from '../BModalForm';

interface IProps {
  onFinish: (needFresh: boolean) => void;
}

const AddRole = ({ onFinish }: IProps) => {
  const { t, i18n } = useTranslation();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [roleList, setRoleList] = useState<role[]>([
    {
      roleCode: 'manager',
      roleName: t('addRole.admin'),
    },
    {
      roleCode: 'normal',
      roleName: t('addRole.user'),
    },
  ]);

  const configModal = (value = false) => {
    setVisible(value);
  };

  return (
    <>
      <Button
        onClick={() => {
          configModal(true);
        }}
        type="primary"
        icon={<PlusOutlined />}
      >
        {t('addRole.title')}
      </Button>
      <ModalForm
        layout={
          i18n.language === 'en-US'
            ? {
                labelCol: {
                  span: 8,
                },
                wrapperCol: {
                  span: 12,
                },
              }
            : {}
        }
        modalStatus={visible}
        title={t('addRole.title')}
        onConfirm={(value) => {
          const { roleName, roleType } = value;
          return apiService
            .addRole({
              roleName,
              roleType,
            })
            .then(() => {
              configModal();
              onFinish(true);
              return true;
            })
            .catch(() => {
              return false;
            });
        }}
        onCancel={() => {
          configModal();
          onFinish(false);
        }}
      >
        <Form.Item
          label={t('addRole.roleName')}
          name="roleName"
          rules={[
            {
              required: true,
              message: t('addRole.require'),
            },
          ]}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          name="roleType"
          label={t('addRole.selectRole')}
          initialValue={roleList[0].roleCode}
          required
        >
          <Select>
            {roleList.map((item) => {
              return (
                <Select.Option key={item.roleCode} value={item.roleCode}>
                  {item.roleName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </ModalForm>
    </>
  );
};

export default AddRole;
