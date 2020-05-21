import React from 'react';
import style from './hookForm.scss';
import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import HookSelectContainer from './HookSelectContainer';

interface Props {
  control: Control;
  defaultValue: number;
}

HookVasSelect.defaultProps = {
  defaultValue: 0
};

function HookVasSelect({ control, defaultValue }: Props) {
  return (
    <HookSelectContainer>
      <label className={style.hookInputLabel}>VAS:</label>
      <Controller
        as={
          <Select className={style.genderSelect}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
        }
        control={control}
        name="vas"
        defaultValue={defaultValue}
      />
    </HookSelectContainer>
  );
}

export default HookVasSelect;
