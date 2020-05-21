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
  defaultValue: string;
}

HookTextArea.defaultProps = {
  required: false,
  errorMsg: '',
  inputStyle: style.hookInputMain,
  defaultValue: ''
};

function HookTextArea({
  label,
  name,
  required,
  setValue,
  error,
  errorMsg,
  inputStyle,
  defaultValue
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
        <Input.TextArea
          id={name}
          name={name}
          onChange={(e) => setValue(name, e.target.value)}
          autoSize={{ minRows: 2 }}
          defaultValue={defaultValue}
        />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookTextArea;
