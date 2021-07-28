import { menu2PermissionCode } from '../constant/permissionCode';

const qiankunConfig = [
  {
    name: 'iot-suite-asset',
    entry: '/asset-app/',
    container: '#container',
    activeRule: '/asset',
    props: { base: '/asset', permissionCode: menu2PermissionCode['/asset'] },
  },
  {
    name: 'iot-suite-device',
    entry: '/device-app/',
    container: '#container',
    activeRule: '/device',
    props: { base: '/device', permissionCode: menu2PermissionCode['/device'] },
  },
  {
    name: 'iot-suite-account',
    entry: '/account-app/',
    container: '#container',
    activeRule: '/account',
    props: {
      base: '/account',
      permissionCode: menu2PermissionCode['/account'],
    },
  },
  {
    name: 'iot-suite-permission',
    entry: '/permission-app/',
    container: '#container',
    activeRule: '/permission',
    props: {
      base: '/permission',
      permissionCode: menu2PermissionCode['/permission'],
    },
  },
];

export default qiankunConfig;
