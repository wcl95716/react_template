import React from 'react';
import { history, Link } from 'umi';
import { List, Avatar, Card, Button } from 'antd';

import { DETAULT_AVATAR } from '@/mock/avatar';

import './index.less';

const data = [{ title: '江景', userId: '1' }];

type RecommendFollowCardProps = {
  recommendType: string;
};

const RecommendFollowCard: React.FC<RecommendFollowCardProps> = ({ recommendType }) => {
  let recommendTitle = '';
  if (recommendType === 'follow') {
    recommendTitle = '关注的人';
  } else if (recommendType === 'recommend') {
    recommendTitle = '推荐关注';
  }

  const handleSendMessage = () => {
    history.push('/im');
  };
  return (
    <Card size="small" className="recommend-follow-card" title={recommendTitle}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={DETAULT_AVATAR} />}
              title={
                <div className="follow-title">
                  <Link to={`/u/${item.userId}`}>
                    <span className="user-name">{item.title}</span>
                  </Link>
                  {recommendType === 'recommend' && <Button size="small">关注</Button>}
                  {recommendType === 'follow' && (
                    <Button size="small" onClick={handleSendMessage}>
                      私信
                    </Button>
                  )}
                </div>
              }
              description={<div className="description">但行好事，莫问前程!</div>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecommendFollowCard;
