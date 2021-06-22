import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import BSwitchLang from '@/components/BSwitchLang';

import styles from './index.less';

const BLayoutLogin = (props) => {
  const history = useHistory();

  // check isLogedIn
  useEffect(() => {
    if (localStorage.getItem('_UID')) {
      history.push('/');
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left} />
      <div className={styles.login}>
        {props.children}
        <div className={styles.lang}>
          <BSwitchLang />
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default BLayoutLogin;
