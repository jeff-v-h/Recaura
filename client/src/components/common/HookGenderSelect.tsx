import React from 'react';
import style from './hookForm.scss';
import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import { Gender } from '../../models/enums';

const { Option } = Select;

interface Props {
  control: Control;
}

function HookGenderSelect({ control }: Props) {
  return (
    <div className={style.hookSelectContainer}>
      <label className={style.hookLabel} htmlFor="gender">
        Gender:
      </label>
      <Controller
        as={
          <Select>
            {Object.values(Gender).map((gender) => (
              <Option key={gender} value={gender}>
                {gender}
              </Option>
            ))}
          </Select>
        }
        control={control}
        name="gender"
        defaultValue="male"
      />
    </div>
  );
}

export default HookGenderSelect;
