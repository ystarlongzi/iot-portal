import { useEffect, useState } from 'react';
// import * as dayjs from 'dayjs';
import { Table, Space, Button, Menu, Dropdown, Alert, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { apiService, user, userListResp } from '@tuya/connector';

import RoleSelector from '../YRoleSelector/RoleSelector';
// import EditUserName from '../YEditUserName/EditUserName';
import ModifyPwd from '../YModifyPwd/ModifyPwd';
import ModifyRole from '../YModifyRole/ModifyRole';
import RemoveAccountModal from '../YRemoveAccount/RemoveAccount';

import styles from './index.less';
import AddUserFlow from '../YAddUser/AddUserFlow';
import YAssetTree from '../YAssetTree';
import { DEFAULT_ADMIN_ROLE_CODE, DEFAULT_NORMAL_ROLE_CODE } from '@/constant';

const PAccount = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<user[]>([]);
  const [pageNo, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [roleCode, setRoleCode] = useState('');
  const [searchKey, setSearchKey] = useState('');

  const fetchTableData = () => {
    setLoading(true);
    apiService
      .getAccountList({
        pageNo,
        pageSize,
        searchKey,
        roleCode,
      })
      .then((res) => {
        setLoading(false);
        const { total, data } = res as userListResp;
        setList(data);
        setTotalCount(total);
      })
      .catch(() => {
        // message.error('获取资产失败!');
        setLoading(false);
        setList([]);
        setTotalCount(0);
      });
  };

  // fresh table list state
  const [tableFresh, setTableFresh] = useState(0);

  const freshTable = () => {
    setTableFresh((state) => {
      return state + 1;
    });
  };

  useEffect(() => {
    fetchTableData();
    setSelectedIds([]);
  }, [tableFresh, roleCode, searchKey, pageNo]);

  // grant user asset permission
  const [userAssetPermissionProps, setUserAssetPermissionProps] = useState({
    visible: false,
    userId: '',
  });
  const toggleAssetAccessModal = (visible, userId = '') => {
    setUserAssetPermissionProps({
      visible,
      userId,
    });
  };

  // modify user role modal
  const [modifyRoleProps, setModifyRoleProps] = useState({
    visible: false,
    uids: [],
    defaultRoleCode: '',
    isBatch: false,
  });
  const toggleModifyRoleModal = ({
    visible,
    uids = [],
    defaultRoleCode = '',
    isBatch = false,
  }) => {
    setModifyRoleProps({
      visible,
      uids,
      defaultRoleCode,
      isBatch,
    });
  };

  // edit nickname modal
  // const [editUserNameProps, setEditUserNameProps] = useState({
  //   visible: false,
  //   userId: '',
  //   nickName: '',
  // });
  // const toggleModifyNameModal = (
  //   visible,
  //   params = {
  //     userId: '',
  //     nickName: '',
  //   },
  // ) => {
  //   setEditUserNameProps({
  //     visible: visible,
  //     userId: params.userId,
  //     nickName: params.nickName,
  //   });
  // };

  // remove account modal
  const [removeAccountProps, setRemoveAccountProps] = useState({
    visible: false,
    uids: [],
    isBatch: false,
  });
  const toggleRemoveAccountModal = (visible, uids = [], isBatch = false) => {
    setRemoveAccountProps({
      visible,
      uids,
      isBatch,
    });
  };

  // modify password
  const [modifyPwdProps, setModifyPwdProps] = useState({
    visible: false,
    userName: '',
  });
  const toggleModifyPwd = (visible, userName = '') => {
    setModifyPwdProps({
      visible,
      userName,
    });
  };

  const columns: Array<any> = [
    {
      title: t('table.column.account'),
      dataIndex: 'userName',
      width: '20%',
      className: styles.tableCell,
    },
    // {
    //   title: t('table.column.nickName'),
    //   dataIndex: 'nickName',
    //   className: styles.tableCell,
    // },
    // {
    //   title: t('table.column.createTime'),
    //   dataIndex: 'createTime',
    //   className: styles.tableCell,
    //   render: (text: any, record: any) => {
    //     const time = dayjs
    //       .unix(record.active_time)
    //       .format('YYYY-MM-DD HH:mm:ss');
    //     return <span className={styles.tableCell}>{time}</span>;
    //   },
    // },
    {
      title: t('table.column.roleName'),
      dataIndex: 'roles',
      className: styles.tableCell,
      render: (text, record) => {
        if (record?.roles?.length) {
          const { roleCode, roleName } = record.roles[0];
          let name = roleName;
          if (
            roleCode === DEFAULT_ADMIN_ROLE_CODE ||
            roleCode === DEFAULT_NORMAL_ROLE_CODE
          ) {
            name = t(`addUser.${roleCode}`);
          }
          return <span>{name}</span>;
        }
        return null;
        // return (
        //   <span>{record?.roles?.length ? record.roles[0].roleName : ''}</span>
        // );
      },
    },
    {
      title: t('table.column.opt'),
      dataIndex: 'opt',
      width: '20%',
      align: 'center',
      render: (text: any, record: any) => {
        let disabled = false;
        try {
          disabled = record.roles[0].roleCode === 'admin';
        } catch (e) {
          console.error(e);
        }
        const menu = (
          <Menu>
            <Menu.Item
              key="0"
              disabled={disabled}
              onClick={() => {
                toggleModifyPwd(true, record.userName);
              }}
            >
              {t('table.row.modifyPwd')}
            </Menu.Item>
            <Menu.Item
              key="1"
              disabled={disabled}
              onClick={() => {
                toggleModifyRoleModal({
                  isBatch: false,
                  visible: true,
                  uids: [record.userId],
                  defaultRoleCode: record?.roles[0].roleCode
                    ? record.roles[0].roleCode
                    : '',
                });
              }}
            >
              {t('table.row.modifyRole')}
            </Menu.Item>
            {/* <Menu.Item
              key="3"
              onClick={() => {
                toggleModifyNameModal(true, {
                  userId: record.userId,
                  nickName: record.nickName,
                });
              }}
            >
              {t('table.row.modifyName')}
            </Menu.Item> */}
            <Menu.Item
              key="4"
              disabled={disabled}
              onClick={() => {
                toggleRemoveAccountModal(true, [record.userId]);
              }}
            >
              {t('table.row.removeAccount')}
            </Menu.Item>
          </Menu>
        );
        return (
          <Space>
            <Button
              type="link"
              disabled={disabled}
              onClick={() => {
                toggleAssetAccessModal(true, record.userId);
              }}
            >
              {t('table.row.assetAccess')}
            </Button>
            <Dropdown overlay={menu} trigger={['click']}>
              <span
                className={`${disabled ? styles.textGray : styles.textBlue} ${
                  styles.pointer
                }`}
              >
                {t('table.row.more')} <DownOutlined />
              </span>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div className={styles.wrap}>
      <Row justify="space-between" className={styles.ctrlRowWrap}>
        <Col>
          <RoleSelector
            onChange={(roleCode, searchKey) => {
              setRoleCode(roleCode);
              setSearchKey(searchKey);
            }}
          />
        </Col>
        <Col>
          <AddUserFlow
            onFinish={() => {
              freshTable();
            }}
          />
        </Col>
      </Row>

      <Alert
        className={styles.alertWrap}
        message={
          <Space>
            <div>
              <span>{t('table.hint')}</span>
              <span className={`${styles.textBlue} ${styles.textSpace}`}>
                {selectedIds.length}
              </span>
              <span>{t('table.hintUnit')}</span>
            </div>
            <Button
              disabled={selectedIds.length === 0}
              onClick={() => {
                toggleModifyRoleModal({
                  visible: true,
                  uids: selectedIds,
                  defaultRoleCode: '',
                  isBatch: true,
                });
                // if (selectedIds.length > 0) {
                // }
              }}
            >
              {t('table.batchModifyRole')}
            </Button>
            <Button
              disabled={selectedIds.length === 0}
              onClick={() => {
                toggleRemoveAccountModal(true, selectedIds, true);
                // if (selectedIds.length > 0) {
                // }
              }}
            >
              {t('table.batchRemoveAccount')}
            </Button>
          </Space>
        }
      />
      <Table
        rowSelection={{
          selectedRowKeys: selectedIds,
          onChange: (keys, rows) => {
            const uids = rows.map((item) => {
              return item.userId;
            });

            setSelectedIds(uids);
          },
          getCheckboxProps(record) {
            try {
              const disabled = record.roles[0].roleCode === 'admin';
              return {
                disabled,
              };
            } catch (e) {
              console.error(e);
            }
          },
        }}
        loading={loading}
        columns={columns}
        rowKey={(record: any) => record.userId}
        dataSource={list}
        pagination={{
          current: pageNo,
          defaultPageSize: pageSize,
          pageSize,
          total: totalCount,
          onChange: (pageNumber) => {
            setPage(pageNumber);
            setSelectedIds([]);
          },
          onShowSizeChange: (currentSize, nextPageSize) => {
            setPageSize(nextPageSize);
          },
        }}
      />
      {/* <EditUserName
        onFinish={(needRefresh) => {
          needRefresh && freshTable();
        }}
        {...editUserNameProps}
      /> */}
      <ModifyPwd
        onFinish={() => {
          toggleModifyPwd(false);
        }}
        {...modifyPwdProps}
      />
      <ModifyRole
        onFinish={(needRefresh) => {
          toggleModifyRoleModal({
            visible: false,
          });
          needRefresh && freshTable();
        }}
        {...modifyRoleProps}
      />
      <RemoveAccountModal
        onCancel={() => {
          toggleRemoveAccountModal(false);
        }}
        onOk={() => {
          toggleRemoveAccountModal(false);
          freshTable();
        }}
        {...removeAccountProps}
      />
      <YAssetTree
        onFinish={() => {
          toggleAssetAccessModal(false);
        }}
        {...userAssetPermissionProps}
      />
    </div>
  );
};

export default PAccount;
