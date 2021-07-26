import * as React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation, getI18n } from 'react-i18next';

import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@/constant';
import VerifyCode from './VerifyCode';

export interface EmailFormField {
  username: string;
  password: string;
  validateCode?: string;
}
export interface EmailFormProps {
  isLogin: boolean;
  onEmailSubmit: (values: EmailFormField) => void;
}
const EmailForm: React.FC<EmailFormProps> = (props) => {
  const { t } = useTranslation();
  const { onEmailSubmit } = props;
  const [form] = Form.useForm();
  const [username, setUsername] = React.useState<string>();

  React.useEffect(() => {
    return () => form.resetFields();
  }, []);

  return (
    <Form form={form} onFinish={onEmailSubmit} validateTrigger={['onBlur']}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: t('login.form.username.validate.require'),
          },
          {
            pattern: EMAIL_REGEXP,
            message: t('login.form.username.validate.emailPattern'),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={t('login.form.username.label')}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>
      {props.isLogin ? (
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('login.form.password.validate.require'),
            },
            {
              pattern: PASSWORD_REGEXP,
              message: t('login.form.password.validate.pattern').replace(
                '%s',
                '6-16',
              ),
            },
          ]}
          extra={<Link to="/resetPwd">{t('login.forgot')}</Link>}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('login.form.password.label')}
          />
        </Form.Item>
      ) : (
        <>
          <VerifyCode
            params={{
              language: (() => {
                const i18n = getI18n();
                const locale = i18n.language;
                return locale;
              })(),
              mail: username,
            }}
            isValid={() => {
              return !(form.getFieldError('username').length > 1) && form.getFieldValue('username').length;
            }}
          />
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('login.form.password.validate.require'),
              },
              {
                pattern: PASSWORD_REGEXP,
                message: t('login.form.password.validate.pattern').replace(
                  '%s',
                  '6-16',
                ),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('login.form.newPassword.label')}
            />
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {props.isLogin ? t('login.signIn') : t('login.resetPwd')}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EmailForm;
