import * as React from 'react';
import { Tabs } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import TeleForm, { TeleFormProps } from './component/TeleForm';
import EmailForm, { EmailFormProps } from './component/EmailForm';
import { LOGIN_TABS } from '@/constant';
import styles from './index.less';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface IBLoginProps extends TeleFormProps, EmailFormProps {
  title?: string;
  subTitle?: string;
  logo?: string | React.ReactNode;
}

const BLogin: React.FC<IBLoginProps> = (props) => {
  const { t } = useTranslation();
  const { title = t('login.title'), onEmailSubmit, onTeleSubmit } = props;

  const [activeKey, setActiveKey] = React.useState<string>(LOGIN_TABS.TELE);
  return (
    <div className={styles.container}>
      {props.isLogin ? (
        <div className={styles.title}>{title}</div>
      ) : (
        <div style={{marginBottom: 25}}>
          <Link to="/login" className={styles.back2login}>
            <LeftCircleOutlined style={{ marginRight: 12 }} />
            {t('login.back2login')}
          </Link>
        </div>
      )}

      <Tabs
        activeKey={activeKey}
        onTabClick={(key) => setActiveKey(key)}
        centered
      >
        <Tabs.TabPane tab={t('login.tabs.tele')} key={LOGIN_TABS.TELE}>
          <TeleForm onTeleSubmit={onTeleSubmit} isLogin={props.isLogin} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('login.tabs.email')} key={LOGIN_TABS.EMAIL}>
          <EmailForm onEmailSubmit={onEmailSubmit} isLogin={props.isLogin} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default BLogin;
