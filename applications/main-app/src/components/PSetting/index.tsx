import { useState } from 'react';
import { Descriptions, Modal, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { PASSWORD_REGEXP } from '@/constant';
import { apiService } from '@tuya/connector';
import { useTranslation } from 'react-i18next';
import styles from './index.less';

const SettingPage = () => {
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const confirmPassword = (rule: any, value: string, callback: any) => {
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(t('setting.form.confirm.validate.unanimous'));
    }
    callback();
  };
  const username = localStorage.getItem('_USERNAME');
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const res = await apiService.resetPassword(
        username,
        values.oldPassword,
        values.newPassword,
      );
      if (res) {
        form.resetFields();
        setVisible(false);
        message.success(t('setting.modifySuccess'));
      }
    });
  };
  return (
    <div className={styles.background}>
      <Descriptions column={1}>
        <Descriptions.Item label={t('setting.username')}>
          {username}
        </Descriptions.Item>
        <Descriptions.Item label={t('setting.password')}>
          ******
          <label
            className={styles.textWrapper}
            onClick={() => setVisible(true)}
          >
            <EditOutlined style={{ marginRight: 3 }} />
            {t('setting.modify')}
          </label>
        </Descriptions.Item>
      </Descriptions>
      <Modal
        title={t('setting.modify')}
        visible={visible}
        closable={true}
        onOk={handleSubmit}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: i18n.language === 'zh-CN' ? 5 : 9 }}
        >
          <Form.Item
            label={t('setting.form.oldPassword.label')}
            required
            name="oldPassword"
            rules={[
              {
                required: true,
                message: t('setting.form.oldPassword.validate.require'),
              },
              {
                pattern: PASSWORD_REGEXP,
                message: t('setting.form.oldPassword.validate.pattern').replace(
                  '%s',
                  '6-16',
                ),
              },
            ]}
          >
            <Input.Password
              placeholder={t('setting.form.oldPassword.validate.require')}
            />
          </Form.Item>
          <Form.Item
            label={t('setting.form.newPassword.label')}
            required
            name="newPassword"
            rules={[
              {
                required: true,
                message: t('setting.form.newPassword.validate.require'),
              },
              {
                pattern: PASSWORD_REGEXP,
                message: t('setting.form.newPassword.validate.pattern').replace(
                  '%s',
                  '6-16',
                ),
              },
            ]}
          >
            <Input.Password
              placeholder={t('setting.form.newPassword.validate.require')}
            />
          </Form.Item>
          <Form.Item
            label={t('setting.form.confirm.label')}
            required
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: t('setting.form.confirm.validate.require'),
              },
              { validator: confirmPassword },
              {
                pattern: PASSWORD_REGEXP,
                message: t('setting.form.confirm.validate.pattern').replace(
                  '%s',
                  '6-16',
                ),
              },
            ]}
          >
            <Input.Password
              placeholder={t('setting.form.confirm.validate.require')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default SettingPage;
