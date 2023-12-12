import React from 'react';
import { BackTop } from 'antd';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout: React.FC = ({ children }) => {
  return (
    <InspectorWrapper>
      {children}
      <BackTop />
    </InspectorWrapper>
  );
};

export default Layout;
