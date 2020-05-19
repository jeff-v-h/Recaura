import React from 'react';
import { DatePicker } from 'antd';
import style from './hookForm.scss';
import HookSelectContainer from './HookSelectContainer';

interface Props {
  name: string;
  setValue: (name: string, value: any) => void;
}

function HookDatePicker({ name, setValue }: Props) {
  const dateFormat = 'YYYY-MM-DD';
  return (
    <HookSelectContainer>
      <label className={style.hookInputLabel}>DOB:</label>
      <DatePicker
        format={dateFormat}
        onChange={(date, dateString) => setValue(name, dateString)}
        placeholder={dateFormat}
      />
    </HookSelectContainer>
  );
}

export default HookDatePicker;
