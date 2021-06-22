import { menu2PermissionCode } from '../constant/permissionCode';

// 获取一级域名，
const getDomain = () => {
  const { hostname } = window.location;
  const [lastAddr, ...restAddr] = hostname.split('.');
  return { lastAddr, restAddr };
};

const domainMap = {
  asset: 'iot-suite-asset',
  device: 'iot-suite-device',
  account: 'iot-suite-account',
  permission: 'iot-suite-permission',
  alarm: 'iot-suite-alarm',
};

const qiankunConfig = [
  {
    name: 'iot-suite-asset',
    entry: (() => {
      // const { restAddr } = getDomain();
      return `/asset-app`;
    })(),
    container: '#container',
    activeRule: '/asset',
    props: { base: '/asset', permissionCode: menu2PermissionCode['/asset'] },
  },
  {
    name: 'iot-suite-device',
    entry: (() => {
      // const { restAddr } = getDomain();
      return `/device-app`;
    })(),
    container: '#container',
    activeRule: '/device',
    props: { base: '/device', permissionCode: menu2PermissionCode['/device'] },
  },
  {
    name: 'iot-suite-account',
    entry: (() => {
      // const { restAddr } = getDomain();
      return `/account-app`;
    })(),
    container: '#container',
    activeRule: '/account',
    props: {
      base: '/account',
      permissionCode: menu2PermissionCode['/account'],
    },
  },
  {
    name: 'iot-suite-permission',
    entry: (() => {
      // const { restAddr } = getDomain();
      return `/permission-app`;
    })(),
    container: '#container',
    activeRule: '/permission',
    props: {
      base: '/permission',
      permissionCode: menu2PermissionCode['/permission'],
    },
  },
];

// if (process.env.NODE_ENV === 'development') {
//   qiankunConfig.length = 0;
//   qiankunConfig.push(...[{
//     name: 'iot-suite-asset',
//     entry: '/iot-suite-asset',
//     container: '#container',
//     activeRule: '/asset',
//     props: { base: '/asset' },
//   },
//   {
//     name: 'iot-suite-device',
//     entry: '/iot-suite-device',
//     container: '#container',
//     activeRule: '/device',
//     props: { base: '/device' },
//   },])
// }

export default qiankunConfig;
