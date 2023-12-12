import { Link } from 'umi';

import { Button, List, Avatar, Skeleton, Tooltip, Space } from 'antd';

import { DETAULT_AVATAR } from '@/mock/avatar';
import book from '@/mock/book.json';

import './index.less';

const KnowledgeList = () => {
  const isLoading = false;

  const loadMore = isLoading ? (
    <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
      <Button>loading more</Button>
    </div>
  ) : null;

  return (
    <List
      className="knowledge-item-list"
      loading={isLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={book}
      renderItem={(item: any) => (
        <List.Item key={item.id}>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Link to={`/u/${item.user.id}`}>
                  <Tooltip title={item.user.name}>
                    <Avatar src={DETAULT_AVATAR} />
                  </Tooltip>
                </Link>
              }
              title={
                <Link to={`/q/${item.id}`}>
                  <span className="name">{item.name}</span>
                </Link>
              }
              description={
                <div>
                  <p>{item.description}</p>
                  <div>
                    <Space size={16}>
                      <span>文档 36</span>
                      <span>关注 163</span>
                    </Space>
                  </div>
                </div>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default KnowledgeList;
