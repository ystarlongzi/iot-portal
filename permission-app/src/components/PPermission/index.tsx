import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.less';
import YRoleList from '../YRoleList';
import YPermissionTable from '../YPermissionTable';
import { Row, Col } from 'antd';

const PPermission = () => {
  const { t } = useTranslation();
  const [roleCode, setRoleCode] = useState('');

  const [roleType, setRoleType] = useState('');

  useEffect(() => {
    const temp = localStorage.getItem('_ROLE_TYPE');
    setRoleType(temp);
  }, []);

  return (
    <Row className={styles.wrap} wrap={false}>
      <Col flex="250px">
        <YRoleList
          onSelect={(roleCode) => {
            setRoleCode(roleCode);
          }}
        />
      </Col>
      <Col flex="5px">
        <div
          style={{
            flex: 1,
            width: 5,
            height: '100%',
            backgroundColor: '#f0f2f5',
          }}
        ></div>
      </Col>
      <Col flex="auto">
        <YPermissionTable roleCode={roleCode} disabled={roleType !== 'admin'} />
        {/* disabled={roleType == 'admin'} /> */}
      </Col>
    </Row>
  );
};

export default PPermission;
