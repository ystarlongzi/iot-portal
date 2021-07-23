import { Modal } from 'antd';
import { useEffect, useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
import { DataNode } from 'antd/lib/tree';
import { useTranslation } from 'react-i18next';
import { apiService } from '@tuya/connector';

import AssetTree from '../BAssetTree';
import {
  formatAssetTreeData,
  assetData2FlatArray,
  getAllLeafNodeByKey,
  wrapRootNode,
  treeRootCheck,
} from './util';
// import { useQueryParams } from '@/hooks';

interface IProps {
  userId: string;
  visible: boolean;
  onFinish: () => void;
  [key: string]: any;
}

const rootKey = 'root';

const YAssetTree = ({ userId, visible, onFinish, ...restProps }: IProps) => {
  const { t } = useTranslation();
  // const location = useLocation();
  // const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<DataNode[]>([]);
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const [expandValues, setExpandValues] = useState<string[]>([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    setLoading(true);
    const baseTreeFetch = apiService.getEntireAssetTree().catch(() => {
      return [];
    });
    const valueTree = apiService
      .getUserAssetPermissionTree(userId)
      .catch(() => {
        return [];
      });
    Promise.all([baseTreeFetch, valueTree])
      .then((results) => {
        setLoading(false);
        const [baseTree, valueTree] = results;
        const permissionAsset = assetData2FlatArray(valueTree);
        const treeData = formatAssetTreeData(baseTree);

        const wrapRootTreeData = wrapRootNode(
          treeData,
          t('assetTree.rootCtrl'),
        );
        const isRootNeedChecked = treeRootCheck(treeData, permissionAsset);
        if (isRootNeedChecked) {
          permissionAsset.unshift(rootKey);
        }
        setDataList(wrapRootTreeData);
        setDefaultValue(permissionAsset);
        setCheckedValues(permissionAsset);
        setExpandValues([
          ...getAllLeafNodeByKey(treeData, treeData[0].key, false),
          rootKey,
        ]);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [visible]);

  const handleSelect = (keys: string[]) => {
    setCheckedValues(keys);
  };

  return (
    <Modal
      destroyOnClose
      title={t('assetTree.title')}
      visible={visible}
      onCancel={onFinish}
      confirmLoading={modalLoading}
      onOk={() => {
        setModalLoading(true);
        apiService
          .grantUserAssetPermission(userId, checkedValues)
          .then(() => {
            setModalLoading(false);
            onFinish();
          })
          .catch(() => {
            setModalLoading(false);
          });
      }}
    >
      <AssetTree
        title={t('assetTree.title')}
        loading={loading}
        dataList={dataList}
        defaultSelectedValue={defaultValue}
        defaultExpandValue={expandValues}
        checkable
        treeWrapProps={{
          style: {
            maxHeight: '50vh',
            overflow: 'auto',
          },
        }}
        rootKey={rootKey}
        {...restProps}
        onSelect={handleSelect}
      />
    </Modal>
  );
};

export default YAssetTree;
