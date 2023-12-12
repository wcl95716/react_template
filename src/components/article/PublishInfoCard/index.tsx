import { Card, Button } from 'antd';
import React from 'react';

import './index.less';

const PublishInfoCard = () => {
  return (
    <Card className="publish-info-card" size="small">
      <div className="publish-items">
        <Button size="small" type="link" href="/edit" target="__blank">
          写文章
        </Button>
        <Button size="small" type="link">
          写想法
        </Button>
        <Button size="small" type="link" href="/article/draft" target="__blank">
          草稿箱
        </Button>
      </div>
    </Card>
  );
};

export default PublishInfoCard;
