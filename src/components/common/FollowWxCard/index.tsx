import React from 'react';
import { Card } from 'antd';

import './index.less';

const FollowWxCard = () => {
  return (
    <Card size="small" className="follow-wx-card">
      <div className="follow-wx-wrapper">
        <img width={100} src="https://moose-plus.oss-cn-shenzhen.aliyuncs.com/default-avatar.png" />
        <div className="follow-text">
          <p>关注微信公众号</p>
          <p>获取每日精选</p>
          <p>wx: 全栈技术部</p>
        </div>
      </div>
    </Card>
  );
};

export default FollowWxCard;
