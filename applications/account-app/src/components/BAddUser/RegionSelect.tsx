import { useState } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { COUNTRY_LIST } from '@/constant';

import styles from './index.less';

interface IProps {
  defaultValue: string;
  onChange: (value: string) => void;
}

const RegionSelect = ({ onChange, defaultValue = '86' }: IProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [selectValue, setSelectValue] = useState<string>(defaultValue);

  return (
    <>
      <Select
        className="countryCode"
        value={selectValue}
        labelInValue={false}
        defaultValue={defaultValue}
        dropdownClassName={styles.selectOptionsWrap}
        style={{ width: 'auto', maxWidth: 150 }}
        onChange={(value: string) => {
          setSelectValue(`+${value}`);
          onChange(value);
        }}
      >
        {COUNTRY_LIST.map((country) => (
          <Select.Option key={country.countryCode} value={country.countryCode}>
            {lang === 'zh-CN' ? country.cnName : country.enName}(+
            {country.countryCode})
          </Select.Option>
        ))}
      </Select>
      <style jsx global>
        {`
          .ant-form-item-has-error
            .countryCode.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
            .ant-select-selector {
            background-color: unset;
          }
        `}
      </style>
    </>
  );
};

export default RegionSelect;
