import React from 'react';
import style from './hookForm.scss';
import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import { CountryCode } from '../../../models/enums';
import HookSelectContainer from './HookSelectContainer';

const { Option } = Select;

interface Props {
  control: Control;
}

function HookCountryCodeSelect({ control }: Props) {
  const values = Object.values(CountryCode);

  return (
    <HookSelectContainer>
      <label className={style.hookSelectLabel} htmlFor="country-code">
        Country Code:
      </label>
      <Controller
        as={
          <Select id="country-code">
            {Object.keys(CountryCode).map((key, i) => (
              <Option key={key} value={values[i]}>
                {key} ({values[i]})
              </Option>
            ))}
          </Select>
        }
        control={control}
        name="countryCode"
        defaultValue="+61"
      />
    </HookSelectContainer>
  );
}

export default HookCountryCodeSelect;
