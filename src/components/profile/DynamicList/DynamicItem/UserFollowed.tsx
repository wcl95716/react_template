import React from 'react';
import { Avatar } from 'antd';

import { DETAULT_AVATAR } from '@/mock/avatar';

import './UserFollowed.less';

const UserFollowed: React.FC<any> = ({ name, description }) => {
  return (
    <div className="user-followed">
      <div className="user-detail">
        <a href="/" target="_blank">
          <span className="popover">
            <Avatar src={DETAULT_AVATAR} />
          </span>
        </a>
        <div className="detail-info">
          <a className="title" href="/" target="_blank">
            {name}
          </a>
          <p className="description">{description}</p>
        </div>
        <div className="likes-info">
          <span>1270</span>
          <span>人关注</span>
        </div>
      </div>
    </div>
  );
};

export default UserFollowed;
