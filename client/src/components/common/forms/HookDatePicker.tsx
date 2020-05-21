import React from 'react';
import { DatePicker } from 'antd';
import style from './hookForm.scss';

interface Props {
  label: string;
  name: string;
  required: boolean;
  setValue: (name: string, value: any) => void;
  error?: any;
  errorMsg?: string;
  inputStyle?: string;
}

HookDatePicker.defaultProps = {
  required: false,
  inputStyle: style.hookInputMain
};

function HookDatePicker({ label, name, required, setValue, error, errorMsg, inputStyle }: Props) {
  const dateFormat = 'YYYY-MM-DD';
  return (
    <div className={style.hookInputContainer}>
      <div>
        <label className={style.hookInputLabel}>
          {required && <span className={style.asterisk}>*</span>}
          {label}:
        </label>
        <span className={style.hookInputSupport}></span>
      </div>
      <div className={inputStyle}>
        <DatePicker
          format={dateFormat}
          onChange={(date, dateString) => setValue(name, dateString)}
          placeholder={dateFormat}
        />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookDatePicker;
