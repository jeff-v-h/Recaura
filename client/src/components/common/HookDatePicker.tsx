import React from 'react';
import { Input, DatePicker } from 'antd';

function HookDatePicker() {
  return (
    <Input.Group compact>
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <DatePicker style={{ width: '50%' }} />
    </Input.Group>
  );
}
