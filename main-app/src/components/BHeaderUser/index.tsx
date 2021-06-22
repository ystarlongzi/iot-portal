import { Dropdown } from 'antd';
import styles from './index.less';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import AccountIcon from './account.png';

const UserInfoMenu = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const menu2 = (
    <div className={styles.wrap}>
      <div className={styles.item}>{localStorage.getItem('_USERNAME')}</div>
      <div className={styles.divider} />
      <div
        className={styles.item}
        onClick={() => {
          localStorage.removeItem('_USERNAME');
          localStorage.removeItem('_UID');
          localStorage.removeItem('_ROLE_TYPE');
          document.cookie = `token=''; expire=${new Date(
            0,
          ).toUTCString()}; path=/`;
          setTimeout(() => {
            history.replace('/login');
          }, 100);
        }}
      >
        <a className="ant-dropdown-link">{t('menu.logout')}</a>
      </div>
    </div>
  );
  return (
    <Dropdown overlay={menu2} trigger={['click']}>
      <img className={styles.avatar} alt="" src={AccountIcon} />
    </Dropdown>
  );
};

export default UserInfoMenu;
