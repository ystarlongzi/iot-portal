import { apiService, role } from '@tuya/connector';
import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalForm from '../BModalForm';
import { DEFAULT_ADMIN_ROLE_CODE, DEFAULT_NORMAL_ROLE_CODE } from '@/constant';

interface IProps {
  visible: boolean;
  uids: string[];
  defaultRoleCode: string;
  onFinish: (needFresh: boolean) => void;
  isBatch?: boolean;
}

const ModifyRole = ({
  uids,
  visible,
  defaultRoleCode = '',
  onFinish,
  isBatch = false,
}: IProps) => {
  const { t } = useTranslation();
  const [roleList, setRoleList] = useState<role[]>([]);
  const [roleCode, setRoleCode] = useState<string>(defaultRoleCode);
  useEffect(() => {
    if (visible) {
      apiService.getEntireRoles({}).then((res) => {
        setRoleList(
          res.filter((item) => {
            return item.roleCode !== 'admin';
          }),
        );
        setRoleCode(defaultRoleCode);
      });
    }
  }, [visible]);

  return (
    <ModalForm
      modalStatus={visible}
      title={isBatch ? t('modifyRole.multiTitle') : t('modifyRole.title')}
      onConfirm={(value) => {
        if (!isBatch) {
          return apiService
            .modifyUserRole(uids[0], value.roleCode)
            .then(() => {
              onFinish(true);
              return true;
            })
            .catch(() => {
              return false;
            });
        }
        return apiService
          .batchModifyUserRole(uids, value.roleCode)
          .then(() => {
            onFinish(true);
            return true;
          })
          .catch(() => {
            return false;
          });
      }}
      onCancel={() => {
        onFinish(false);
      }}
    >
      <Form.Item
        key={roleCode}
        name="roleCode"
        label={t('modifyRole.label')}
        initialValue={roleCode}
      >
        <Select>
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
      </Form.Item>
    </ModalForm>
  );
};

export default ModifyRole;
