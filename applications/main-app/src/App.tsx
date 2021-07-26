import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import { getI18n, useTranslation } from 'react-i18next';

import { globalMenu, runQiankun, setGlobalState } from './qiankun';
import init from './init';
import './App.css';
import pages from '@/pages';
import { apiService, permission } from '@tuya/connector';
import { permissionCode2MenuPath } from './constant/permissionCode';
import PageError from './pages/403';

// 鉴权例外列表
const excludePathList = ['/login', '/resetPwd', '/403'];

const App = () => {
  const mainHistory = useHistory();
  init(mainHistory);
  const needAuth = !excludePathList.includes(mainHistory.location.pathname);

  const [loading, setLoading] = useState(true);
  const [permissionMenuList, setPermissionMenuList] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem('_UID');
    if (!uid) {
      setLoading(false);
      mainHistory.push('/login');
      return;
    }

    apiService
      .getPermissionListByAccount(uid)
      .then((res) => {
        const menu = (res as permission[])
          .filter((item) => {
            if (item.permissionType === 'menu') {
              return Object.assign(item, {
                path: permissionCode2MenuPath[item.permissionCode],
              });
            }
          })
          .sort((a, b) => {
            if (a.permissionCode > b.permissionCode) {
              return 1;
            }
            if (a.permissionCode < b.permissionCode) {
              return -1;
            }
            return 0;
          });

        // setGlobalState({
        //   menu,
        // });
        globalMenu.push(...menu);
        setPermissionMenuList(menu);

        setLoading(false);

        runQiankun({ mainHistory }, menu, res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const i18n = getI18n();
  const locale = i18n.language === 'zh-CN' ? zhCN : enUS;

  if (needAuth) {
    // 非例外布局，均需校验登录状态
    const value = localStorage.getItem('_UID');
    if (!value) {
      mainHistory.push('/login');
    }
  }

  return (
    <ConfigProvider locale={locale}>
      <div>
        <Switch>
          {pages.map((item) => {
            return (
              <Route key={item.name} {...item}>
                {loading && needAuth ? (
                  <Spin spinning>
                    <div style={{ width: '100vw', height: '100vh' }}></div>
                  </Spin>
                ) : (
                  <item.page menu={permissionMenuList} />
                )}
              </Route>
            );
          })}
        </Switch>
      </div>
    </ConfigProvider>
  );
};

export default App;
