import {
  registerMicroApps,
  start,
  addGlobalUncaughtErrorHandler,
  initGlobalState,
  MicroAppStateActions,
} from 'qiankun';
import globalState from './globalState';
import config from './config';

export let setGlobalState;
export const micState: any = {};
export const globalMenu: any = [];

export const runQiankun = (props, menu, permissionList) => {
  const activeRules = menu.map((item) => {
    return item.path;
  });
  const microMenu = config.filter((item) => {
    return activeRules.includes(item.activeRule);
  });
  registerMicroApps(
    microMenu.map((item) => {
      item.props = Object.assign(item.props, {
        ...props,
      });
      console.log('主应用挂载：', item.name);

      return item;
    }),
  );

  start({ sandbox: { experimentalStyleIsolation: true } });
  addGlobalUncaughtErrorHandler((error) => {
    console.log(error);
    if (
      (typeof error === 'string' && /.*is not existed!$/.test(error)) ||
      (typeof error === 'object' && /.*is not existed!$/.test((error as any).message))
    ) {
      window.location.replace('/login');
    }
  });

  //主应用与微应用 微应用与微应用 之间相互通信
  const actions: MicroAppStateActions = initGlobalState(globalState);

  actions.onGlobalStateChange((state, prev) => {
    Object.assign(micState, state);
    console.log('main1', state, prev);
  }, true);
  setGlobalState = (state) => {
    actions.setGlobalState({ ...state });
    console.log('setGlobalState', state, micState);
  };
};
