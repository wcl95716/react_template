import React from 'react';
import { Space } from 'antd';

type IconTextProps = {
  icon: React.ForwardRefExoticComponent<React.Attributes>;
  text: string | number;
};

const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default IconText;
