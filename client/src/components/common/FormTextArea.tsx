import React from 'react';
import style from './formTextArea.scss';
import { Input, Form } from 'antd';

type Props = { label: string; name: string; required?: boolean };

export default ({ label, name, required = false }: Props) => {
  const rules = required ? { required: true, message: `${label} required!` } : { required: false };

  return (
    <Form.Item label={label} name={name} rules={[rules]} className={style.textSection}>
      <Input.TextArea autoSize={{ minRows: 2 }} />
    </Form.Item>
  );
};
