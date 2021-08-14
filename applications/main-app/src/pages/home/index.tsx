import React from 'react';
import BLayout from '@/components/BLayout';
import { Switch, Route, useLocation } from 'react-router-dom';
import SettingPage from './setting';
import PageError from '../403';
import { Spin } from 'antd';

// import { micState } from '@/qiankun';

const Home = ({ menu }) => {
  const { pathname } = useLocation();

  const pathInMenu =
    menu.filter((item) => {
      // let path = pathname;
      // if (path[path.length - 1] === '/') {
      //   path = pathname.slice(0, -1);
      // }
      return (item.path || '').replace(/\//g, '') === pathname.replace(/\//g, '');
    }).length > 0;
  return (
    <BLayout menu={menu}>
      <div id="container">
        {/* {pathInMenu ? (
          <Spin spinning style={{ height: 300 }} />
        ) : (
          <PageError backPath={menu.length ? menu[0].path : '/login'} />
        )} */}
      </div>
      <Switch>
        <Route path="/setting" exact>
          <SettingPage />
        </Route>
        <Route path="*">
          {pathInMenu ? null : (
            <PageError backPath={menu.length ? menu[0].path : '/login'} />
          )}
        </Route>
      </Switch>
    </BLayout>
  );
};

export default Home;
