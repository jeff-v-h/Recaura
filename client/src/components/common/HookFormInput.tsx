import React from 'react';
import { Input } from 'antd';
import style from './hookForm.scss';

interface Props {
  label: string;
  name: string;
  setValue: (name: string, value: any) => void;
  error: any;
  errorMsg: string;
}

function HookFormInput({ label, name, setValue, error, errorMsg }: Props) {
  return (
    <div className={style.hookInputContainer}>
      <label className={style.hookLabel} htmlFor={name}>
        {label}:
      </label>
      <div className={style.hookInputMain}>
        <Input id={name} name={name} onChange={(e) => setValue(name, e.target.value)} />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookFormInput;
