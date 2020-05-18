import React from 'react';
import { Input } from 'antd';

interface Props {
  label: string;
  name: string;
  setValue: (name: string, value: any) => void;
  error: any;
  errorMsg: string;
}

function HookFormInput({ label, name, setValue, error, errorMsg }: Props) {
  return (
    <div>
      <label>
        {label}:
        <Input name={name} onChange={(e) => setValue(name, e.target.value)} />
      </label>
      {error && <span>{errorMsg}</span>}
    </div>
  );
}

export default HookFormInput;
