import { DataNode } from 'antd/lib/tree';

export const assetData2FlatArray = (list) => {
  const result = [];
  list.forEach((item) => {
    const { asset_id, is_authorized } = item;
    if (is_authorized) {
      result.push(asset_id);
    }
    if (item?.subAssets.length) {
      result.push(...assetData2FlatArray(item.subAssets));
    }
  });
  return result;
};

export const formatAssetTreeData = (list) => {
  const result = [];
  list.forEach((item) => {
    const temp: DataNode = {
      key: item.asset_id,
      title: item.asset_name,
      checkable: true,
      disabled: item.is_authorized === false,
      selectable: false,
      isLeaf: true,
    };

    if (item?.subAssets.length) {
      temp.isLeaf = false;
      temp.children = formatAssetTreeData(item.subAssets);
    }

    result.push(temp);
  });

  return result;
};

// 找到树中，某个节点的所有叶子节点
export const getAllLeafNodeByKey = (tree, key, inPath) => {
  const result = [];
  if (!Array.isArray(tree) || !tree.length) {
    return result;
  }
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    if (item.key === key) {
      result.push(item.key, ...getAllLeafNodeByKey(item.children, key, true));
      break;
    }
    if (inPath) {
      if (item.isLeaf) {
        result.push(item.key);
      } else {
        result.push(...getAllLeafNodeByKey(item.children, key, true));
      }
    } else {
      const subResult = getAllLeafNodeByKey(item.children, key, false);
      if (subResult.length) {
        // 补齐父节点
        result.push(item.key, ...subResult);
      } else {
        result.push(...subResult);
      }
    }
  }

  return [...result];
};

export const wrapRootNode = (treeData, title) => {
  if (treeData.length) {
    const root: DataNode = {
      key: 'root',
      title,
      checkable: true,
      disabled: false,
      selectable: false,
      isLeaf: false,
      children: treeData,
    };
    return [root];
  }
  return treeData;
};

const treeCheckState = (treeData, checkedSet) => {
  let result = true;
  for (let i = 0; i < treeData.length; i++) {
    if (!result) {
      return result;
    }
    const item = treeData[i];
    if (!checkedSet.has(item.key)) {
      result = false;
      return result;
    }
    if (item.children) {
      result = treeCheckState(item.children, checkedSet);
    }
  }
  return result;
};

export const treeRootCheck = (treeData, checkedValues) => {
  const set = new Set(checkedValues);
  return treeCheckState(treeData, set);
};
