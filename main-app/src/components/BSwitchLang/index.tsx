import { FC, useCallback } from 'react';
import { Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
// import { setGlobalState } from '@/qiankun';

interface Lang {
  label: string;
  value: string;
}
export interface IBSwitchLangProps {
  lang?: Lang[];
  className?: string;
}

const BSwitchLang: FC<IBSwitchLangProps> = (props) => {
  const { lang, className } = props;
  const { i18n } = useTranslation();
  const langList = lang
    ? lang
    : [
        {
          label: '简体中文',
          value: 'zh-CN',
        },
        {
          label: 'English',
          value: 'en-US',
        },
      ];
  // setGlobalState({ lang: i18n.language });
  const onLangChange = useCallback((e) => {
    if (i18n.language !== e.key) {
      // setGlobalState({ lang: e.key });
      i18n.changeLanguage(e.key);
      window.location.reload();
    }
  }, []);
  return (
    <Dropdown
      className={className}
      overlay={
        <Menu onClick={onLangChange}>
          {langList.map((item) => (
            <Menu.Item key={item.value}>{item.label}</Menu.Item>
          ))}
        </Menu>
      }
    >
      <span style={{ cursor: 'pointer' }}>
        <GlobalOutlined style={{ marginRight: 5 }} />
        {i18n.language === 'zh-CN' ? '简体中文' : 'English'}
      </span>
    </Dropdown>
  );
};

export default BSwitchLang;
