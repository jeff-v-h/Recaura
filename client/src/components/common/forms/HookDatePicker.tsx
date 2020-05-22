import React from 'react';
import { DatePicker } from 'antd';
import style from './hookForm.scss';
import { Controller, Control } from 'react-hook-form';
import moment from 'moment';

interface Props {
  label: string;
  name: string;
  required: boolean;
  error?: any;
  errorMsg?: string;
  inputStyle?: string;
  control: Control;
}

HookDatePicker.defaultProps = {
  required: false,
  inputStyle: style.hookInputMain
};

function HookDatePicker({ label, name, required, error, errorMsg, inputStyle, control }: Props) {
  const dateFormat = 'DD-MM-YYYY';
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
        <Controller
          as={<DatePicker format={dateFormat} placeholder={dateFormat} name={name} />}
          onChange={([selected]) => (selected ? moment(selected) : undefined)}
          name={name}
          control={control}
        />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookDatePicker;
