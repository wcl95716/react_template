import { Link } from 'umi';

import { List, Avatar, Button, Skeleton, Tooltip, Tag } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

import { DETAULT_AVATAR } from '@/mock/avatar';
import questions from '@/mock/question.json';

import './index.less';

const QuestionList = () => {
  const isLoading = false;

  const loadMore = isLoading ? (
    <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
      <Button>loading more</Button>
    </div>
  ) : null;

  console.log(questions);

  return (
    <div className="question-list">
      <List
        className="question-item-list"
        loading={isLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={questions}
        renderItem={(item: any) => (
          <List.Item
            actions={
              item.loading
                ? []
                : [
                    <div key={item.id} className="question-wrapper">
                      <div className="reslove">
                        <span>{item.answers}</span>
                        <span>解决</span>
                      </div>

                      <div className="read">
                        <span>{item.real_views}</span>
                        <span>阅读</span>
                      </div>
                    </div>,
                  ]
            }
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Link to={`/u/${item.last_answer.user.id}`}>
                    <Tooltip title={item.last_answer.user.name}>
                      <Avatar src={DETAULT_AVATAR} />
                    </Tooltip>
                  </Link>
                }
                title={
                  <Link to={`/q/${item.id}`}>
                    <span className="title">{item.title}</span>
                  </Link>
                }
                description={
                  <div>
                    {item.tags &&
                      item.tags.map((tag: any) => {
                        return (
                          <Link key={tag.id} to={`/t/${item.id}`}>
                            <Tag key={tag.id}>{tag.name}</Tag>
                          </Link>
                        );
                      })}
                    <LikeOutlined /> <span>{item.votes}</span>
                  </div>
                }
              />
              <div></div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionList;
