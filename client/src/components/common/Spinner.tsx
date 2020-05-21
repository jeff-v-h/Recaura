import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  fontSize: number;
}

export default ({ fontSize }: Props) => {
  const spinIcon = <LoadingOutlined style={{ fontSize }} spin />;
  return <Spin indicator={spinIcon} />;
};
