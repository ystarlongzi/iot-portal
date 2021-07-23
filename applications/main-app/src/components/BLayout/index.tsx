import { useState, useEffect } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { useTranslation } from 'react-i18next';
import { useHistory, Link, useLocation } from 'react-router-dom';
import HeaderUser from '@/components/BHeaderUser';
import TuyaLogo from './tuyalogo.png';
import routerMap from './routers';

const BLayout = ({ children, menu = [] }) => {
  const [pathname, setPathname] = useState('/asset');
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const title = t('menu.title.default');

  const route = {
    routes: [],
  };

  menu.forEach((item) => {
    const routePath = item.path;
    let routeItem = routerMap[routePath];
    if (!routeItem) {
      routeItem = {
        path: item.path,
        name: item.path,
        icon: null,
        component: null,
      };
    }
    route.routes.push({
      ...routeItem,
      name: t(routeItem.name),
    });
  });

  const menuItemRender = (menuItemProps, defaultDom) => {
    return (
      <Link
        to={menuItemProps.path}
        style={{ height: 40 }}
        onClick={() => {
          setPathname(menuItemProps.path);
        }}
      >
        {defaultDom}
      </Link>
    );
  };

  const Logo = () => {
    return <img src={TuyaLogo} alt="" style={{ height: 28 }} />;
  };

  useEffect(() => {
    // console.log(location.pathname);
    if (menu.length === 0) {
      history.push('/403');
      return;
    }
    if (location.pathname === '/') {
      history.push(menu[0].path);
      return;
    } else setPathname(location.pathname);
  }, []);

  return (
    <ProLayout
      location={{ pathname: location.pathname }}
      logo={() => <Logo />}
      navTheme="light"
      headerTheme="light"
      fixSiderbar
      fixedHeader
      layout="mix"
      contentStyle={{ minHeight: 'calc(100vh - 96px)' }}
      route={route}
      title={title}
      onMenuHeaderClick={() => {
        if (menu.length === 0) {
          history.push('/403');
          return;
        }

        history.push(menu[0].path);
      }}
      menuItemRender={menuItemRender}
      rightContentRender={() => <HeaderUser />}
    >
      {children}
    </ProLayout>
  );
};

export default BLayout;
