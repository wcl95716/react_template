import React from 'react';
import cls from 'classnames';

import './index.less';

type MooseContainerProps = {
  containerClassName?: string;
};

const MooseContainer: React.FC<MooseContainerProps> = ({ children, containerClassName }) => {
  return (
    <div className={cls('moose-container')}>
      <div className={cls('moose-wrapper')}>
        <div className={cls('main-container', containerClassName)}>{children}</div>
      </div>
    </div>
  );
};

export default MooseContainer;
