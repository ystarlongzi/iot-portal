import { Result, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const PageError = ({ backPath = '/login' }) => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <Result
      status="403"
      title="403"
      subTitle={t('pageError')}
      extra={
        <Space>
          <Button
            onClick={() => {
              localStorage.removeItem('_USERNAME');
              localStorage.removeItem('_UID');
              localStorage.removeItem('_ROLE_TYPE');
              history.push('/login');
            }}
          >
            {t('backLoginPage')}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push(backPath);
            }}
          >
            {t('backHome')}
          </Button>
        </Space>
      }
    />
  );
};

export default PageError;
