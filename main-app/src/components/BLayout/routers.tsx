import AssetsIcon from './assets-icon.png';
import DeviceIcon from './devices-icon.png';
import SettingIcon from './setting-icon.png';
import AccountIcon from './account-icon.png';
import RoleIcon from './role-icon.png';

const iconStyle = {
  width: 16,
  height: 16,
  marginTop: -2,
  marginRight: 10,
};

const Assets = () => {
  return <img src={AssetsIcon} alt="" style={iconStyle} />;
};
const Device = () => {
  return <img src={DeviceIcon} alt="" style={iconStyle} />;
};
const Setting = () => {
  return <img src={SettingIcon} alt="" style={iconStyle} />;
};
const Role = () => {
  return <img src={RoleIcon} alt="" style={iconStyle} />;
};
const Account = () => {
  return <img src={AccountIcon} alt="" style={iconStyle} />;
};

const routerMap = {
  '/asset': {
    path: '/asset',
    name: 'menu.title.assets',
    icon: <Assets />,
    component: '@/pages/Assets',
  },
  '/device': {
    path: '/device',
    name: 'menu.title.devices',
    icon: <Device />,
    component: '@/pages/Devices',
  },
  '/setting': {
    path: '/setting',
    name: 'menu.title.setting',
    icon: <Setting />,
    component: '@/pages/setting',
  },
  '/permission': {
    path: '/permission',
    name: 'menu.title.permission',
    icon: <Role />,
    component: '',
  },
  '/account': {
    path: '/account',
    name: 'menu.title.account',
    icon: <Account />,
    component: '',
  }
};

export default routerMap;
