import React from 'react';
import style from './hookForm.scss';
import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import { Honorific } from '../../models/enums';
import HookSelectContainer from './HookSelectContainer';

const { Option } = Select;

interface Props {
  control: Control;
}

function HookHonorificSelect({ control }: Props) {
  return (
    <HookSelectContainer>
      <label className={style.hookLabel} htmlFor="honorific">
        Title:
      </label>
      <Controller
        as={
          <Select id="honorific" className={style.honorificSelect}>
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
    </HookSelectContainer>
  );
}

export default HookHonorificSelect;
