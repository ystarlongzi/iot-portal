import { apiService, role } from '@tuya/connector';
import { Select, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ADMIN_ROLE_CODE, DEFAULT_NORMAL_ROLE_CODE } from '@/constant';

interface IProps {
  onChange: (roleCode: string, searchKey: string) => void;
}

const RoleSelector = ({ onChange }: IProps) => {
  const { t } = useTranslation();
  const [roleCode, setRoleCode] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [roleList, setRoleList] = useState<role[]>([]);
  useEffect(() => {
    apiService.getEntireRoles({}).then((res) => {
      setRoleList(res);
    });
  }, []);

  return (
    <Space>
      <label>{t('roleSelector.label')}: </label>
      <Select
        style={{ width: 150 }}
        value={roleCode}
        placeholder={t('roleSelector.all')}
        onSelect={(value: string) => {
          setRoleCode(value);
          onChange(value, searchKey);
        }}
      >
        <Select.Option key="allRole" value="">
          {t('roleSelector.all')}
        </Select.Option>
        {roleList.map((item) => {
          return (
            <Select.Option key={item.roleCode} value={item.roleCode}>
              {item.roleCode === DEFAULT_ADMIN_ROLE_CODE ||
              item.roleCode === DEFAULT_NORMAL_ROLE_CODE
                ? t(`addUser.${item.roleCode}`)
                : item.roleName}
            </Select.Option>
          );
        })}
      </Select>
      <Input
        value={searchKey}
        // maxLength={20}
        placeholder={t('roleSelector.placeholder')}
        style={{
          width: 250,
        }}
        onChange={(e) => {
          const { value } = e.target;
          setSearchKey(value);
          onChange(roleCode, value);
        }}
        suffix={
          <SearchOutlined
            style={{
              color: '#d9d9d9',
            }}
          />
        }
      />
      <Button
        type="primary"
        onClick={() => {
          setRoleCode('');
          setSearchKey('');
          onChange('', '');
        }}
      >
        {t('roleSelector.reset')}
      </Button>
    </Space>
  );
};

export default RoleSelector;
