const arr2Obj = (arr, key) => {
  const result = {};
  arr.forEach((item) => {
    result[item[key]] = item;
  });

  return result;
};

export const flattenArr = (arr) => {
  const result = [];
  arr.forEach((item) => {
    result.push(item);
    if (item.children) {
      result.push(...flattenArr(item.children));
    }
  });

  return result;
};

/**
 * 合并渲染列表
 * @param baseList 基础列表
 * @param permissionCodeList 数据列表
 */
export const mergePermissionTable = (baseList, permissionCodeList) => {
  // const valueObj: any = arr2Obj(valueList, 'permissionCode');
  const valueSet = new Set(permissionCodeList);
  const result = baseList.map((item) => {
    // 二维数组，只需遍历到children即可，无需递归遍历
    let childrenAllChecked = true;
    let childrenAllUnchecked = true;
    const children = item.children.map((elem) => {
      const checked = valueSet.has(elem.permissionCode);
      if (!checked && elem.authorizable) {
        childrenAllChecked = false;
      }
      if (checked) {
        childrenAllUnchecked = false;
      }
      return Object.assign({}, elem, {
        checked,
      });
    });
    return Object.assign({}, item, {
      checked: valueSet.has(item.permissionCode),
      indeterminate: !childrenAllChecked && !childrenAllUnchecked,
      children,
    });
  });
  return result;
};

export const checkCoupling = (
  permissionCode,
  checked,
  permissionCodeList,
  baseList,
) => {
  // const flatArr = flattenArr(valueList);
  const valueObj: any = arr2Obj(baseList, 'permissionCode');
  const checkedPermissionCodes = new Set<string>(permissionCodeList);
  // const baseObj: any = arr2Obj(baseList, 'permissionCode');
  // const valueObj: any = {};
  // baseList.forEach((item) => {
  //   if (checkedPermissionCodes.has(item.permissionCode)) {
  //     valueObj[item.permissionCode] = item;
  //   }
  // });
  baseList.forEach((item) => {
    const parentCode = item.parentCode;
    if (valueObj[parentCode]) {
      if (valueObj[parentCode].childrenCodes) {
        valueObj[parentCode].childrenCodes.push(item.permissionCode);
      } else {
        valueObj[parentCode].childrenCodes = [item.permissionCode];
      }
    }
  });

  const item = valueObj[permissionCode];
  if (checked) {
    // menu
    if (item.permissionType === 'menu') {
      checkedPermissionCodes.add(permissionCode);
      // 全选子项
      valueObj[permissionCode].childrenCodes.forEach((code) => {
        if (valueObj[code].authorizable) {
          checkedPermissionCodes.add(code);
        }
      });
    }
    // api or button
    if (item.permissionType === 'api' || item.permissionType === 'button') {
      // api 全选之后，menu 需要被选择
      const parentItem = valueObj[item.parentCode];
      // 默认半选, 半选也是选中状态
      // parentItem.indeterminate = true;
      parentItem.checked = true;
      checkedPermissionCodes.add(parentItem.permissionCode);
      checkedPermissionCodes.add(permissionCode);

      // 依赖节点添加勾选
      item.dependencies.forEach((code) => {
        checkedPermissionCodes.add(code);
      });

      // const childrenCodes = valueObj[parentItem.permissionCode]?.childrenCodes;
      // if (childrenCodes) {
      //   // 检测是不是行全选状态
      //   let parentNeedFullCheck = true;
      //   childrenCodes.forEach((code) => {
      //     if (!parentNeedFullCheck) {
      //       return;
      //     }
      //     if (!checkedPermissionCodes.has(code)) {
      //       parentNeedFullCheck = false;
      //     }
      //   });
      //   if (parentNeedFullCheck) {
      //     // checkedPermissionCodes.add(item.parentCode);
      //     parentItem.indeterminate = false;
      //   }
      // }
    }
  } else {
    // menu
    if (item.permissionType === 'menu') {
      checkedPermissionCodes.delete(permissionCode);
      // 取消子项
      valueObj[permissionCode].childrenCodes.forEach((code) => {
        checkedPermissionCodes.delete(code);
      });
    }
    // api or button
    if (item.permissionType === 'api' || item.permissionType === 'button') {
      checkedPermissionCodes.delete(permissionCode);
      const parentItem = valueObj[item.parentCode];
      // 默认半选, 半选也是选中状态
      // parentItem.indeterminate = true;
      // parentItem.checked = true;
      // checkedPermissionCodes.add(parentItem.permissionCode);
      const childrenCodes = valueObj[parentItem.permissionCode]?.childrenCodes;
      if (childrenCodes) {
        let parentNeedCancelCheck = true;
        childrenCodes.forEach((code) => {
          const elem = valueObj[code];
          // 查看兄弟节点是否依赖curr节点
          if (elem.dependencies.includes(permissionCode)) {
            checkedPermissionCodes.delete(code);
          }
          // if (!parentNeedCancelCheck) {
          //   return;
          // }
          if (checkedPermissionCodes.has(code)) {
            parentNeedCancelCheck = false;
          }
        });
        if (parentNeedCancelCheck) {
          checkedPermissionCodes.delete(parentItem.permissionCode);
          // parentItem.indeterminate = false;
          // parentItem.checked = false;
        }
      }
    }
  }

  return Array.from(checkedPermissionCodes);
  // const result = Array.from(checkedPermissionCodes).map((code) => {
  //   return valueObj[code as string];
  // });

  // return result;
};
