import React from 'react';
import { Input } from 'antd';
import style from './hookForm.scss';

interface Props {
  label: string;
  name: string;
  required: boolean;
  setValue: (name: string, value: any) => void;
  error?: any;
  errorMsg?: string;
  inputStyle?: string;
  placeholder?: string;
}

HookFormInput.defaultProps = {
  required: false,
  errorMsg: '',
  inputStyle: style.hookInputMain
};

function HookFormInput({
  label,
  name,
  required,
  setValue,
  error,
  errorMsg,
  inputStyle,
  placeholder
}: Props) {
  return (
    <div className={style.hookInputContainer}>
      <div>
        <label className={style.hookInputLabel} htmlFor={name}>
          {required && <span className={style.asterisk}>*</span>}
          {label}:
        </label>
        <span className={style.hookInputSupport}></span>
      </div>
      <div className={inputStyle}>
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={(e) => setValue(name, e.target.value)}
        />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookFormInput;
