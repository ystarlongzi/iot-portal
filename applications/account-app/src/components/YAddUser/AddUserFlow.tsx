import { useEffect, useState } from 'react';
import { Button, Form, Modal, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { addAccountParams, apiService, role } from '@tuya/connector';
import BAddUserTabForm from '../BAddUser';

interface IProps {
  onFinish: (needRefresh: boolean) => void;
}

const { useForm } = Form;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const AddUserFlow = ({ onFinish }: IProps) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [formValues, setFormValues] = useState({
    accountType: 'tele',
    roleCode: '',
    countryCode: '86',
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [roleList, setRoleList] = useState<role[]>([
    {
      roleCode: 'manager',
      roleName: t('addUser.form.manager'),
    },
    {
      roleCode: 'normal',
      roleName: t('addUser.form.normal'),
    },
  ]);

  const configModal = (value = false) => {
    setVisible(value);
    setFormValues({
      accountType: 'tele',
      roleCode: '',
      countryCode: '86',
    });
  };

  useEffect(() => {
    apiService.getEntireRoles({}).then((res) => {
      setRoleList(
        res.filter((item) => {
          return item.roleCode !== 'admin';
        }),
      );
    });
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          configModal(true);
        }}
        type="primary"
        icon={<PlusOutlined />}
      >
        {t('addUser.create')}
      </Button>
      <Modal
        destroyOnClose
        visible={visible}
        title={t('addUser.modal.title')}
        confirmLoading={confirmLoading}
        onOk={() => {
          return form
            .validateFields()
            .then((values) => {
              setConfirmLoading(true);
              const { accountType, countryCode, roleCode } = formValues;
              const params: addAccountParams = {
                password: values.password,
                roleCodes: [roleCode],
                userName: values.userName,
              };
              if (accountType === 'tele') {
                params.countryCode = countryCode;
              }
              return apiService
                .addAccount(params)
                .then(() => {
                  setConfirmLoading(false);
                  form.resetFields();
                  // setVisible(false);
                  configModal();
                  onFinish(true);
                  return true;
                })
                .catch(() => {
                  setConfirmLoading(false);
                  return false;
                });
            })
            .catch((info) => {
              console.error('Validate Failed:', info);
              setConfirmLoading(false);
              return true;
            });
        }}
        onCancel={() => {
          configModal();
        }}
      >
        {visible ? (
          <Form
            form={form}
            preserve={false}
            {...layout}
            validateTrigger={['onBlur']}
          >
            <BAddUserTabForm
              formValues={formValues}
              roleList={roleList}
              onValueChange={(values) => {
                setFormValues(values);
              }}
            />
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

export default AddUserFlow;
