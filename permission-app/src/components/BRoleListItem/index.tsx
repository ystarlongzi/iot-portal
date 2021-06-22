import { Input, Row, Col, message, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '@tuya/connector';
import {
  DEFAULT_ADMIN_ROLE_CODE,
  DEFAULT_NORMAL_ROLE_CODE,
} from '../../constant';

interface IProps {
  roleName: string;
  roleCode: string;
  onRemove: (roleCode: string) => void;
  onFinish: (needRefresh: boolean) => void;
}

const BRoleListItem = ({ roleName, roleCode, onFinish, onRemove }: IProps) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [value, setValue] = useState(roleName);

  useEffect(() => {
    if (showEditor) {
      inputRef.current.focus();
    }
  }, [showEditor]);

  return (
    <>
      {showEditor ? (
        <Input
          ref={inputRef}
          maxLength={20}
          value={value}
          onChange={(e) => {
            const inputValue = e.target.value;
            setValue(inputValue);
          }}
          onBlur={(e) => {
            setShowEditor(false);
            const inputValue = e.target.value;
            if (inputValue.length === 0) {
              message.error(t('editRole.require'));
              onFinish(false);
              return;
            }
            apiService
              .editRoleName({
                roleCode,
                roleName: inputValue,
              })
              .then(() => {
                onFinish(true);
              });
          }}
        />
      ) : (
        <Row className="roleItem" justify="space-between">
          <Col>{roleName}</Col>
          {roleCode === DEFAULT_ADMIN_ROLE_CODE ||
          roleCode === DEFAULT_NORMAL_ROLE_CODE ? null : (
            <Col className="roleItemCtrl">
              <Space>
                <EditOutlined
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEditor(true);
                  }}
                />
                <DeleteOutlined
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove(roleCode);
                  }}
                />
              </Space>
            </Col>
          )}
        </Row>
      )}
      <style jsx>{`
        .roleItem {
          padding: 15px;
          padding-left: 5px;
        }
        .roleItemCtrl {
          display: none;
        }
        .roleItem:hover .roleItemCtrl {
          display: block;
        }
        .roleItem:hover {
          background-color: #e6f7ff;
        }
      `}</style>
    </>
  );
};

export default BRoleListItem;
