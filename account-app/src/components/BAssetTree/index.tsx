import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Empty, Input, Spin, Typography } from 'antd';
import Tree, { DataNode } from 'antd/lib/tree';
import { useTranslation } from 'react-i18next';

import {
  filterTreePath,
  getAllExpendKeyFromFirstChild,
  getEntireTreeNodeKeys,
  omitRootKey,
} from './util';
import { getAllLeafNodeByKey } from '../YAssetTree/util';

interface IProps {
  loading: boolean;
  title: string;
  checkable?: boolean;
  dataList?: Array<DataNode>;
  defaultSelectedValue?: Array<string>;
  defaultCheckedValue?: Array<string>;
  defaultExpandValue?: string[];
  onSelect?: (keys: string[]) => void;
  // onCheck?: (key: string) => void;
  treeWrapProps?: any;
  rootKey?: string;
  [key: string]: any;
}

/**
 * 资产树筛选组件
 * 默认展开一级资产的所有节点
 * 筛选后，高亮资产名，并收缩非关键路径节点
 */
const AssetTree = ({
  loading = false,
  title,
  checkable = false,
  defaultSelectedValue = [],
  defaultCheckedValue = [],
  defaultExpandValue = [],
  dataList = [],
  onSelect,
  // onCheck,
  treeWrapProps = {},
  rootKey = '',
  ...props
}: IProps) => {
  const { t } = useTranslation();
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] =
    useState<Array<string>>(defaultSelectedValue);
  const [treeData, setTreeData] = useState<Array<DataNode>>(dataList);
  const [selectedKeys, setSelectedKeys] =
    useState<Array<string>>(defaultSelectedValue);
  const [halfCheckedKeys, setHalfChecked] = useState<Array<string>>(
    selectedKeys.length && !selectedKeys.includes(rootKey) ? [rootKey] : [],
  );
  const [entireTreeNodeKeys, setEntireTreeNodeKeys] = useState<string[]>([]);

  useEffect(() => {
    const keys = getEntireTreeNodeKeys(dataList);
    setEntireTreeNodeKeys(keys);
    if (defaultExpandValue.length) {
      setExpandedKeys(defaultExpandValue);
      setSelectedKeys(defaultSelectedValue);
      if (defaultSelectedValue.length === keys.length) {
        setHalfChecked([]);
        setSelectedKeys([...defaultSelectedValue, rootKey]);
      } else if (defaultSelectedValue.length > 0) {
        setHalfChecked([rootKey]);
      } else {
        setHalfChecked([]);
      }
    } else if (dataList.length) {
      const expandedKeys = getAllExpendKeyFromFirstChild(dataList, true);
      setExpandedKeys(expandedKeys);
    }
    setTreeData(dataList);
  }, [dataList, defaultExpandValue]);

  // 重置为原始数据
  // const resetTreeData = () => {
  //   setTreeData(dataList);
  // };

  const onSearch = (e) => {
    const { value } = e.target;
    const [taggedTreeData, expandedPath] = filterTreePath(value, dataList);
    if (!value.length) {
      // 搜索被清空
      if (!selectedKeys.length) {
        // 默认展开一级所有节点
        const expandedKeys = getAllExpendKeyFromFirstChild(dataList, true);
        setExpandedKeys(expandedKeys);
      } else {
        // 展开选择节点
        setExpandedKeys(
          getAllLeafNodeByKey(taggedTreeData, selectedKeys[0], false),
        );
      }
    } else {
      setExpandedKeys(expandedPath);
    }
    setTreeData(taggedTreeData);
    setAutoExpandParent(true);
  };

  const handleExpand = (expandedKeys) => {
    setAutoExpandParent(false);
    setExpandedKeys(expandedKeys);
  };

  // const handleSelect = (selectedKeys) => {
  //   if (selectedKeys.length) {
  //     const key = selectedKeys[selectedKeys.length - 1];
  //     setSelectedKeys([key]);
  //     onSelect(key);
  //   }
  // };

  const handleCheck = ({ checked, halfChecked }, info) => {
    const {
      checked: checkedValue,
      node: { key },
    } = info;

    if (key === rootKey) {
      if (checkedValue) {
        // 全选状态
        setSelectedKeys(entireTreeNodeKeys);
        onSelect(omitRootKey(entireTreeNodeKeys, rootKey));
        setHalfChecked([]);
        return;
      }
      // 取消全选
      setSelectedKeys([]);
      onSelect([]);
      setHalfChecked([]);
      return;
    }

    if (checkedValue) {
      const temp = [...checked];
      if (checked.length + 1 === entireTreeNodeKeys.length) {
        temp.push(rootKey);
        setHalfChecked([]);
      } else if (checked.length) {
        setHalfChecked([rootKey]);
      }
      setSelectedKeys(temp);
      onSelect(omitRootKey(temp, rootKey));
      return;
    }

    const omitRootList = omitRootKey(checked, rootKey);
    setSelectedKeys(omitRootList);
    onSelect(omitRootList);
    if (omitRootList.length) {
      setHalfChecked([rootKey]);
      return;
    }
    setHalfChecked([]);

    // console.log(checked, halfChecked);
    // const checkedKeysTemp = [...checked];
    // const newArrIncludeRoot = checked.includes(rootKey);
    // const oldArrIncludeRoot = selectedKeys.includes(rootKey);
    // // const newHalfIncludeRoot = halfChecked.includes(rootKey);
    // // const oldHalfIncludeRoot = halfCheckedKeys.includes(rootKey);

    // // checked 有变化，新增root
    // if (newArrIncludeRoot && !oldArrIncludeRoot) {
    //   // 全选状态
    //   setSelectedKeys(entireTreeNodeKeys);
    //   onSelect(omitRootKey(entireTreeNodeKeys, rootKey));
    //   setHalfChecked([]);
    //   return;
    // }
    // if (!newArrIncludeRoot && oldArrIncludeRoot) {
    //   // 取消全选
    //   setSelectedKeys([]);
    //   onSelect([]);
    //   setHalfChecked([]);
    //   return;
    // }
    // if (!newArrIncludeRoot && !oldArrIncludeRoot) {
    //   const temp = [...checked];
    //   if (checked.length + 1 === entireTreeNodeKeys.length) {
    //     temp.push(rootKey);
    //     setHalfChecked([]);
    //   } else if (checked.length) {
    //     setHalfChecked([rootKey]);
    //   }
    //   setSelectedKeys(temp);
    //   onSelect(omitRootKey(temp, rootKey));
    //   return;
    // }

    // if (newArrIncludeRoot && oldArrIncludeRoot) {
    //   const omitRootList = omitRootKey(checked, rootKey);
    //   setSelectedKeys(omitRootList);
    //   onSelect(omitRootList);
    //   setHalfChecked([rootKey]);
    // }
  };

  return (
    <Spin spinning={loading}>
      <Input
        allowClear
        // maxLength={20}
        style={{ marginBottom: 15 }}
        placeholder={t('assetTree.searchPlaceholder')}
        onChange={onSearch}
        suffix={<SearchOutlined />}
      />
      {!loading && treeData.length ? (
        <div {...treeWrapProps} id="debugTree">
          <Tree
            checkStrictly
            checkable={checkable}
            onExpand={handleExpand}
            autoExpandParent={autoExpandParent}
            expandedKeys={expandedKeys}
            checkedKeys={{
              checked: selectedKeys,
              halfChecked: halfCheckedKeys,
            }}
            defaultCheckedKeys={defaultCheckedValue}
            // onSelect={handleSelect}
            onCheck={handleCheck}
            treeData={treeData}
          />
        </div>
      ) : (
        <Empty />
      )}
    </Spin>
  );
};

export default AssetTree;
