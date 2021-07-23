export const permissionCode2MenuPath = {};

export const menu2PermissionCode = {};

const baseData = {
  1000: '/asset',
  2000: '/device',
  3000: '/permission',
  4000: '/account',
  5000: '/alarm',
  6000: '/setting',
};

const fillData = () => {
  Object.keys(baseData).map((key) => {
    permissionCode2MenuPath[key] = baseData[key];
    menu2PermissionCode[baseData[key]] = key;
  });
};

fillData();
