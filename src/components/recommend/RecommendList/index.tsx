import React from 'react';
import { Link } from 'umi';
import { List, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import IconText from '@/components/IconText';

import data from '@/mock/recommend';

import './index.css';

const listData = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < data.length; i++) {
  const item = data[i];
  listData.push({
    title: (item.article_info && item.article_info.title) || '',
    avatar: (item.author_user_info && item.author_user_info.avatar_large) || '',
    description: (item.article_info && item.article_info.title) || '',
    content: (item.article_info && item.article_info.brief_content) || '',
    cover_image: (item.article_info && item.article_info.cover_image) || '',
    digg_count: (item.article_info && item.article_info.digg_count) || 0,
    comment_count: (item.article_info && item.article_info.comment_count) || 0,
    article_id: item.article_id || 0,
  });
}

const RecommendList = () => {
  return (
    <div className="recommend-list">
      <List
        bordered={false}
        itemLayout="vertical"
        pagination={false}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text={item.digg_count}
                key="recommend-list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text={item.digg_count}
                key="recommend-list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.digg_count}
                key="recommend-list-vertical-message"
              />,
            ]}
            extra={!item.cover_image ? null : <img width={272} alt="logo" src={item.cover_image} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <Link to={`/detail/${item.article_id}`} target="_blank">
                  <span className="title">{item.title}</span>
                </Link>
              }
            />
            <div className="recommend-list-content">{item.content}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RecommendList;
