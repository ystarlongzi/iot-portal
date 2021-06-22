import { useEffect, useState } from 'react';
import { Checkbox, Row, Col, Empty, Button, Spin, message } from 'antd';
import { apiService } from '@tuya/connector';
import { mergePermissionTable, flattenArr, checkCoupling } from './utils';

import styles from './index.less';
import { useTranslation } from 'react-i18next';

interface IProps {
  roleCode: string;
  disabled: boolean;
}

const YPermissionTable = ({ roleCode, disabled = false }: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // 用户权限列表
  // const [permissionList, setPermissionList] = useState([]);
  // permissionCode[]
  const [checkedList, setCheckedList] = useState<string[]>([]);
  // 基础权限列表
  const [basePermissionList, setBasePermissionList] = useState([]);
  const [flattenBasePermissionList, setFlattenBasePermissionList] = useState(
    [],
  );
  const [templatePermissionCodeList, setTemplatePermissionCodeList] = useState<
    string[]
  >([]);
  // 数据合并权限列表
  const [valueList, setValueList] = useState([]);

  useEffect(() => {
    if (!roleCode) {
      return;
    }
    // 重置功能，需要的模板数据
    const template = apiService.getRolePermissionTemplate(
      roleCode.split('-')[0],
    );
    const detail = apiService.getRolePermissionDetail(roleCode);
    const base = apiService.getRolePermissionTemplate('admin');
    Promise.all([base, detail, template]).then((res) => {
      const [baseRes, detailRes, templateRes] = res;
      setBasePermissionList(baseRes);
      setFlattenBasePermissionList(flattenArr(baseRes));
      const permissionCodeArr = detailRes.map((item) => {
        return item.permissionCode;
      });
      setCheckedList(permissionCodeArr);

      // 重置需要的数据
      const templatePermissionCodes = flattenArr(templateRes).map((item) => {
        return item.permissionCode;
      });
      setTemplatePermissionCodeList(templatePermissionCodes);
    });
  }, [roleCode]);

  useEffect(() => {
    const value = mergePermissionTable(basePermissionList, checkedList);
    setValueList(value);
  }, [basePermissionList, checkedList]);

  const handleCheckChange = (permissionCode, checked) => {
    const newCheckedList = checkCoupling(
      permissionCode,
      checked,
      checkedList,
      flattenBasePermissionList,
    );
    setCheckedList(newCheckedList);
  };

  const handleCheckAll = () => {
    // const permissionCodes = flattenBasePermissionList.map((item) => {
    //   return item.permissionCode;
    // });

    setCheckedList(templatePermissionCodeList);
  };

  return (
    <>
      {!roleCode ? (
        <Empty />
      ) : (
        <Spin spinning={loading}>
          <div className={styles.tableWrap}>
            {valueList.map((item, index) => {
              let isMenuDisabled = !item.authorizable;
              if (disabled) {
                isMenuDisabled = true;
              }
              return (
                <Row
                  align="middle"
                  key={`${roleCode}-${index}`}
                  className={styles.rowWrap}
                >
                  <Col span={4}>
                    <Checkbox
                      disabled={isMenuDisabled}
                      className={styles.checkbox}
                      indeterminate={item.indeterminate}
                      checked={item.checked}
                      onChange={(e) => {
                        // 过滤一下，halfcheck状态，点击是checked
                        let value = e.target.checked;
                        if (item.indeterminate) {
                          value = true;
                        }
                        handleCheckChange(item.permissionCode, value);
                      }}
                    >
                      {item.permissionName}
                    </Checkbox>
                  </Col>
                  <Col span={1}>
                    <div className={styles.border}></div>
                  </Col>
                  <Col span={19}>
                    <Row justify="start">
                      {item.children.map((elem, i) => {
                        let isDisabled = !elem.authorizable;
                        if (disabled) {
                          isDisabled = true;
                        }
                        return (
                          <Col key={`${roleCode}-${index}-${i}`}>
                            <Checkbox
                              disabled={isDisabled}
                              className={styles.checkbox}
                              checked={elem.checked}
                              onChange={(e) => {
                                const value = e.target.checked;
                                handleCheckChange(elem.permissionCode, value);
                              }}
                            >
                              {elem.permissionName}
                            </Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </div>
          <Row justify="end" className={styles.buttonGroupWrap} gutter={16}>
            <Col pull={1}>
              <Button
                disabled={disabled}
                onClick={() => {
                  handleCheckAll();
                }}
              >
                {t('permissionTable.reset')}
              </Button>
            </Col>
            <Col pull={1}>
              <Button
                disabled={disabled}
                type="primary"
                onClick={() => {
                  setLoading(true);
                  apiService
                    .grantPermissionByRole({
                      roleCode,
                      permissionCodes: checkedList,
                    })
                    .then(() => {
                      setLoading(false);
                      message.info(t('permissionTable.success'));
                    })
                    .catch(() => {
                      setLoading(false);
                    });
                }}
              >
                {t('permissionTable.save')}
              </Button>
            </Col>
          </Row>
        </Spin>
      )}
    </>
  );
};

export default YPermissionTable;
