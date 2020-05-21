import React from 'react';
import style from './hookForm.scss';

interface Props {
  label: string;
  name: string;
  required: boolean;
  error?: any;
  errorMsg?: string;
  inputStyle?: string;
  register: (ref: Element | null) => void;
}

HookTextArea.defaultProps = {
  required: false,
  errorMsg: '',
  inputStyle: style.hookInputMain
};

function HookTextArea({ label, name, required, error, errorMsg, inputStyle, register }: Props) {
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
        <textarea id={name} name={name} ref={register} className={style.textArea} />
        <span className={style.error}>{error && errorMsg}</span>
      </div>
    </div>
  );
}

export default HookTextArea;
