import { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { apiService, DeviceInfo } from '@tuya/connector';

import styles from './table.less';

const { getDevicesInfoByAssetId } = apiService;

interface IProps {
  assetId: string;
  editDeviceName: (isOK: boolean, name: string, id: string) => void;
  ctrlDP: (isOK: boolean, name: string, id: string) => boolean;
  removeDevice: () => void;
}

const TableDevice = ({
  assetId,
  editDeviceName,
  ctrlDP,
  removeDevice,
}: IProps) => {
  const { t } = useTranslation();
  const [list, setList] = useState<DeviceInfo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTableData = (
    assetId: string,
    curPage: number,
    curPageSize: number,
  ) => {
    if (!assetId) {
      return;
    }
    setLoading(true);
    getDevicesInfoByAssetId(assetId, curPage, curPageSize)
      .then((res) => {
        setLoading(false);

        setList(res?.data || []);
        setTotalCount(res?.total || 0);
      })
      .catch(() => {
        setLoading(false);
        setList([]);
        setTotalCount(0);
      });
  };

  // list fresh state
  const [tableFresh] = useState(0);

  // const freshTable = () => {
  //   setTableFresh((state) => {
  //     return state + 1;
  //   });
  // };

  useEffect(() => {
    fetchTableData(assetId, page, pageSize);
  }, [tableFresh, assetId, page]);

  const columns: Array<any> = [
    {
      title: t('table.column.name'),
      dataIndex: 'name',
      width: '20%',
      className: styles.tableCell,
    },
    {
      title: t('table.column.id'),
      dataIndex: 'id',
      className: styles.tableCell,
    },
    {
      title: t('table.column.online'),
      dataIndex: 'online',
      render: (text: any, record: any) => {
        if (record.online) {
          return (
            <Space>
              <span className={`${styles.cycle} ${styles.green}`}></span>
              <span className={styles.tableCell}>{t('table.row.online')}</span>
            </Space>
          );
        }
        return (
          <Space>
            <span className={`${styles.cycle} ${styles.red}`}></span>
            <span className={styles.tableCell}>{t('table.row.offline')}</span>
          </Space>
        );
      },
    },
    {
      title: t('table.column.activeTime'),
      dataIndex: 'active_time',
      className: styles.tableCell,
      render: (text: any, record: any) => {
        // const time = moment(record.active_time * 1000).format(
        //   'YYYY-MM-DD HH:mm:ss',
        // );
        return <span className={styles.tableCell}>{'time'}</span>;
      },
    },
    {
      title: t('table.column.opt'),
      dataIndex: 'opt',
      width: '20%',
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <Space>
            <div
              onClick={() => {
                editDeviceName(true, record.name, record.id);
                // configEditDevice(true, record.name, record.id);
              }}
              className={styles.textBlue}
            >
              {t('table.row.edit')}
            </div>
            <div
              className={styles.textBlue}
              onClick={() => {
                ctrlDP(true, record.name, record.id);
                // configCtrlDP(true, record.name, record.id);
              }}
            >
              {t('table.row.ctrl')}
            </div>
            <div className={styles.textBlue} onClick={() => {}}>
              {t('table.row.remove')}
            </div>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      rowKey={(record: any) => record.id}
      dataSource={list}
      pagination={{
        current: page,
        defaultPageSize: pageSize,
        pageSize,
        total: totalCount,
        onChange: (pageNumber) => {
          setPage(pageNumber);
        },
        onShowSizeChange: (currentSize, nextPageSize) => {
          setPageSize(nextPageSize);
        },
      }}
    />
  );
};

export default TableDevice;
