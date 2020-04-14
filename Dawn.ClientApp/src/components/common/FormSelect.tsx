import * as React from "react";
import style from "./formTextArea.scss";
import { Select, Form } from "antd";

const { Option } = Select;
type Props = {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
};

export default ({ label, name, options, required = false }: Props) => {
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
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((option) => (
          <Option key={option} value={option.toLowerCase()}>
            {option}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
