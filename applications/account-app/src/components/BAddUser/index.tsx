import { Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LockOutlined } from '@ant-design/icons';
import { role } from '@tuya/connector';

import RegionSelect from './RegionSelect';
import {
  TELE_REGEXP,
  US_TELE_REGEXP,
  PASSWORD_REGEXP,
  EMAIL_REGEXP,
  DEFAULT_ADMIN_ROLE_CODE,
  DEFAULT_NORMAL_ROLE_CODE,
} from '@/constant';
const { Option } = Select;

interface IProps {
  accountTypeDisabled?: boolean;
  userNameDisabled?: boolean;
  showRoleSelector?: boolean;
  roleList: role[];
  formValues: {
    countryCode: string;
    accountType: string;
    roleCode: string;
    userName?: string;
  };
  onValueChange: (values: any) => void;
}

const BAddUserTabForm = ({
  roleList,
  formValues,
  onValueChange,
  accountTypeDisabled = false,
  userNameDisabled = false,
  showRoleSelector = true,
}: IProps) => {
  const { t } = useTranslation();

  const [countryCode, setCountryCode] = useState<string>(
    formValues.countryCode,
  );
  const [accountType, setAccountType] = useState<string>(
    formValues.accountType,
  );
  const [roleCode, setRoleCode] = useState<string>(formValues.roleCode);

  useEffect(() => {
    setRoleCode(roleList.length ? roleList[roleList.length - 1].roleCode : '');
  }, [roleList]);

  useEffect(() => {
    onValueChange({
      countryCode,
      accountType,
      roleCode,
    });
  }, [countryCode, accountType, roleCode]);

  const userNameProps = {
    defaultValue: null,
  };

  let initialValue = '';

  if (userNameDisabled) {
    userNameProps.defaultValue = formValues.userName;
    initialValue = formValues.userName;
  }

  return (
    <>
      <Form.Item
        label={t('addUser.form.accountType')}
        name="accountType"
        required
      >
        <Radio.Group
          disabled={accountTypeDisabled}
          defaultValue="tele"
          onChange={(e) => {
            const { value } = e.target;
            setAccountType(value);
          }}
        >
          <Radio.Button value="tele">
            {t('addUser.form.phone.label')}
          </Radio.Button>
          <Radio.Button value="email">
            {t('addUser.form.email.label')}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {accountType === 'tele' ? (
        <Form.Item
          initialValue={initialValue}
          key="phone"
          label={t('addUser.form.phone.label')}
          name="userName"
          rules={[
            {
              required: true,
              message: t('addUser.form.username.validate.require'),
            },
            {
              pattern: countryCode === '86' ? TELE_REGEXP : US_TELE_REGEXP,
              message: t('addUser.form.phone.phonePattern'),
            },
          ]}
        >
          <Input
            disabled={userNameDisabled}
            {...userNameProps}
            addonBefore={
              userNameDisabled ? null : (
                <RegionSelect
                  defaultValue={countryCode}
                  onChange={(value) => {
                    setCountryCode(value);
                  }}
                />
              )
            }
            placeholder={t('addUser.form.phone.placeholder')}
          />
        </Form.Item>
      ) : (
        <Form.Item
          initialValue={initialValue}
          key="email"
          label={t('addUser.form.email.label')}
          name="userName"
          rules={[
            {
              required: true,
              message: t('addUser.form.username.validate.require'),
            },
            {
              pattern: EMAIL_REGEXP,
              message: t('addUser.form.username.validate.emailPattern'),
            },
          ]}
        >
          <Input
            {...userNameProps}
            disabled={userNameDisabled}
            placeholder={t('addUser.form.email.placeholder')}
          />
        </Form.Item>
      )}

      <Form.Item
        className="addUserItem"
        label={t('addUser.form.password.label')}
        name="password"
        rules={[
          {
            required: true,
            message: t('addUser.form.password.validate.require'),
          },
          {
            pattern: PASSWORD_REGEXP,
            message: '',
          },
        ]}
        extra={
          <>
            <div className="pwdExtra">
              {t('addUser.form.password.validate.pattern').replace(
                '%s',
                '6-16',
              )}
            </div>
            <style jsx>
              {`
                .addUserItem .ant-form-item-explain {
                  display: none;
                }
                .pwdExtra {
                  color: #bfbfbf;
                }
                .ant-form-item-has-error .pwdExtra {
                  margin-bottom: 24px;
                  color: #ff4d4f;
                }
              `}
            </style>
          </>
        }
      >
        <Input.Password placeholder={t('addUser.form.password.label')} />
      </Form.Item>
      {showRoleSelector ? (
        <Form.Item label={t('addUser.form.role.label')} required>
          <Select
            value={roleCode}
            onChange={(value) => {
              setRoleCode(value);
            }}
          >
            {roleList.map((item) => {
              return (
                <Option value={item.roleCode} key={item.roleCode}>
                  {item.roleCode === DEFAULT_ADMIN_ROLE_CODE ||
                  item.roleCode === DEFAULT_NORMAL_ROLE_CODE
                    ? t(`addUser.${item.roleCode}`)
                    : item.roleName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      ) : null}

      {/* <Form.Item label={t('addUser.form.nickName')}>
        <Input />
      </Form.Item> */}
    </>
  );
};

export default BAddUserTabForm;
