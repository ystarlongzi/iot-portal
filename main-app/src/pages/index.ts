import { permission } from '@tuya/connector';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import PageError from './403';
import HomePage from './home';
import LoginPage from './login';
import ResetPwd from './resetPwd';

interface Props {
  menu?: permission[];
  backPath?: string;
}

export interface IPage {
  name: string;
  path: string;
  exact: boolean;
  page: FC<Props | RouteComponentProps>;
}

const index: IPage[] = [
  { name: '登录页', path: '/login', exact: true, page: LoginPage },
  { name: '重置密码', path: '/resetPwd', exact: true, page: ResetPwd },
  { name: '错误', path: '/403', exact: true, page: PageError },
  { name: '首页', path: '/', exact: false, page: HomePage },
];

export default index;
