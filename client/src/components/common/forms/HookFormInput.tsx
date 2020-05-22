import React from 'react';
import style from './hookForm.scss';

interface Props {
  label: string;
  name: string;
  required: boolean;
  register: (ref: HTMLInputElement | null) => void;
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
  register,
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
        <input
          id={name}
          name={name}
          ref={register}
          className={style.input}
          placeholder={placeholder}
        />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookFormInput;
