import * as React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import { useTranslation, getI18n } from 'react-i18next';
import {
  TELE_REGEXP,
  US_TELE_REGEXP,
  PASSWORD_REGEXP,
  COUNTRY_LIST,
} from '@/constant';

import styles from '../index.less';
import VerifyCode from './VerifyCode';

export interface TeleFormField {
  phoneNum: string;
  password: string;
  countryCode: string;
  validateCode?: string;
}
export interface TeleFormProps {
  onTeleSubmit: (values: TeleFormField) => void;
  isLogin: boolean;
}

const TeleForm: React.FC<TeleFormProps> = (props) => {
  const { onTeleSubmit } = props;
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const lang = i18n.language;
  const [phoneNum, setPhoneNum] = React.useState<string>();
  const [regionCode, setRegionCode] = React.useState('86');
  const [selectValue, setSelectValue] = React.useState('+86');

  React.useEffect(() => {
    return () => form.resetFields();
  }, []);

  const handleRegionChange = (value: string) => {
    setRegionCode(value);
    setSelectValue(`+${value}`);
  };

  const region = (
    <>
      <Select
        className="countryCode"
        value={selectValue}
        labelInValue={false}
        defaultValue="86"
        dropdownClassName={styles.selectOptionsWrap}
        style={{ width: 'auto', maxWidth: 150 }}
        onChange={handleRegionChange}
      >
        {COUNTRY_LIST.map((country) => (
          <Select.Option key={country.countryCode} value={country.countryCode}>
            {lang === 'zh-CN' ? country.cnName : country.enName}(+
            {country.countryCode})
          </Select.Option>
        ))}
      </Select>
      <style jsx global>
        {`
          .ant-form-item-has-error
            .countryCode.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
            .ant-select-selector {
            background-color: unset;
          }
        `}
      </style>
    </>
  );
  return (
    <Form
      form={form}
      onFinish={(args: TeleFormField) => {
        onTeleSubmit({ ...args, countryCode: regionCode });
      }}
      validateTrigger={['onBlur']}
    >
      <Form.Item
        name="phoneNum"
        rules={[
          {
            required: true,
            message: t('login.form.username.validate.require'),
          },
          {
            pattern: regionCode === '86' ? TELE_REGEXP : US_TELE_REGEXP,
            message: t('login.form.phone.phonePattern'),
          },
        ]}
      >
        <Input
          addonBefore={region}
          placeholder={t('login.form.phone.label')}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
      </Form.Item>
      {!props.isLogin ? (
        <>
          <VerifyCode
            params={{
              phone: phoneNum,
              countryCode: regionCode,
              language: (() => {
                const i18n = getI18n();
                const locale = i18n.language;
                return locale;
              })(),
            }}
            isValid={() => {
              return !(form.getFieldError('phoneNum').length > 1) && form.getFieldValue('phoneNum');
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
      ) : (
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
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {props.isLogin ? t('login.signIn') : t('login.resetPwd')}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default TeleForm;
