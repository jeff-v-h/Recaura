import React from 'react';
import style from './hookForm.scss';

interface Props {
  label: string;
  name: string;
  required: boolean;
  register: (ref: HTMLInputElement | null) => void;
  error?: any;
  errorMsg?: string;
  placeholder?: string;
  isPrivate?: boolean;
  labelStyle?: string;
}

HookInputStandard.defaultProps = {
  required: false,
  errorMsg: '',
  private: false,
  labelStyle: style.hookLabelDivLong
};

function HookInputStandard({
  label,
  name,
  required,
  register,
  error,
  errorMsg,
  placeholder,
  isPrivate,
  labelStyle
}: Props) {
  return (
    <div className={style.hookInputContainer}>
      <div>
        <div className={labelStyle}>
          <label className={style.hookInputLabel} htmlFor={name}>
            {required && <span className={style.asterisk}>*</span>}
            {label}:
          </label>
        </div>
        <span className={style.hookInputSupport}></span>
      </div>
      <div className={style.hookInputLong}>
        <input
          id={name}
          name={name}
          ref={register}
          className={style.input}
          placeholder={placeholder}
          type={isPrivate ? 'password' : 'text'}
        />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookInputStandard;
