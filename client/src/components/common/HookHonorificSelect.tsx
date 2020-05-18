import React from 'react';
import style from './hookForm.scss';
import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import { Honorific } from '../../models/enums';

const { Option } = Select;

interface Props {
  control: Control;
}

function HookHonorificSelect({ control }: Props) {
  return (
    <div className={style.hookSelectContainer}>
      <label className={style.hookLabel} htmlFor="honorific">
        Title:
      </label>
      <Controller
        as={
          <Select id="honorific">
            {Object.values(Honorific).map((title) => (
              <Option key={title} value={title}>
                {title}
              </Option>
            ))}
          </Select>
        }
        control={control}
        name="honorific"
        defaultValue="Mr"
      />
    </div>
  );
}

export default HookHonorificSelect;
