import { apiService } from '@tuya/connector';
import { Input, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BRoleListItem from '../BRoleListItem';
import AddRole from '../YAddRole';
import RemoveRoleModal from '../YRemoveRole';
import { DEFAULT_ADMIN_ROLE_CODE, DEFAULT_NORMAL_ROLE_CODE } from '@/constant';

import styles from './index.less';

interface IProps {
  onSelect: (roleCode: string) => void;
}

const YRoleList = ({ onSelect }: IProps) => {
  const { t } = useTranslation();
  const [roleList, setRoleList] = useState([]);
  const [currentSelectRole, setCurrentSelectRole] = useState('');
  const [fresh, setFresh] = useState(1);

  const [removeModalProps, setRemoveModalProps] = useState({
    visible: false,
    roleCode: '',
  });

  useEffect(() => {
    apiService.getEntireRoles().then((res) => {
      const result = res.filter((item) => {
        return item.roleCode !== 'admin';
      });
      setRoleList(result);
      if (result.length) {
        let role = result[0];
        if (result.length > 1 && fresh > 1) {
          role = result[result.length - 1];
        }
        setCurrentSelectRole(role.roleCode);
        onSelect(role.roleCode);
      }
    });
  }, [fresh]);

  const reload = () => {
    setFresh((preState) => {
      return preState + 1;
    });
  };

  return (
    <div className={styles.roleListWrap}>
      <Row
        justify="space-between"
        align="middle"
        className={styles.roleListTop}
      >
        <Col className={styles.roleListTitle}>{t('roleList.title')}</Col>
        <Col>
          <AddRole
            onFinish={(needRefresh) => {
              if (!needRefresh) {
                return;
              }
              reload();
            }}
          />
        </Col>
      </Row>

      <div>
        {roleList.map((item) => {
          const selected = currentSelectRole === item.roleCode;
          let roleName = item.roleName;
          if (
            item.roleCode === DEFAULT_ADMIN_ROLE_CODE ||
            item.roleCode === DEFAULT_NORMAL_ROLE_CODE
          ) {
            roleName = t(`roleList.${item.roleCode}`);
          }
          return (
            <div
              key={`${item.roleCode}`}
              className={`${selected ? 'selected' : ''}`}
              onClick={() => {
                if (currentSelectRole !== item.roleCode) {
                  setCurrentSelectRole(item.roleCode);
                  onSelect(item.roleCode);
                }
              }}
            >
              <BRoleListItem
                roleCode={item.roleCode}
                roleName={roleName}
                onFinish={(needRefresh) => {
                  if (needRefresh) {
                    reload();
                  }
                }}
                onRemove={(roleCode) => {
                  setRemoveModalProps({
                    visible: true,
                    roleCode,
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      <RemoveRoleModal
        {...removeModalProps}
        onOk={(needRefresh) => {
          setRemoveModalProps({
            visible: false,
            roleCode: '',
          });
          if (needRefresh) {
            reload();
          }
        }}
      />
      <style jsx>{`
        .selected {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default YRoleList;
