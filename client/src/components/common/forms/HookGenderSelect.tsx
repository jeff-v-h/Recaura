import React from 'react';
import style from './hookForm.scss';
import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import { Gender } from '../../../models/enums';
import HookSelectContainer from './HookSelectContainer';

const { Option } = Select;

interface Props {
  control: Control;
}

function HookGenderSelect({ control }: Props) {
  return (
    <HookSelectContainer>
      <label className={style.hookInputLabel}>Gender:</label>
      <Controller
        as={
          <Select className={style.genderSelect}>
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
    </HookSelectContainer>
  );
}

export default HookGenderSelect;
