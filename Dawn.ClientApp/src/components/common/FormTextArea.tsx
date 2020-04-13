import * as React from "react";
import style from "./formTextArea.scss";
import { Input, Form } from "antd";

type Props = { label: string; required?: boolean };

export default ({ label, required = false }: Props) => {
  const rules = required
    ? { required: true, message: `${label} required!` }
    : { required: false };

  return (
    <Form.Item
      label={label}
      name={label}
      rules={[rules]}
      className={style.textSection}
    >
      <Input.TextArea autoSize={{ minRows: 2 }} />
    </Form.Item>
  );
};
