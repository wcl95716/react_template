import { Card, List } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'umi';

import IconText from '@/components/IconText';

import data from '@/mock/recommend-article.json';

import './index.css';

const CorrelationArticleCard = () => {
  return (
    <Card className="correlation-article-card" size="small" title="相关文章">
      <List
        itemLayout="vertical"
        size="small"
        split={false}
        dataSource={data}
        pagination={false}
        footer={null}
        renderItem={(item) => (
          <Link to={`/detail/${item.article_id}`} target="__blank">
            <List.Item
              key={item.article_id}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text={item.article_info.digg_count}
                  key="recommend-list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text={item.article_info.digg_count}
                  key="recommend-list-vertical-like-o"
                />,
              ]}
            >
              {item.article_info.title}
            </List.Item>
          </Link>
        )}
      />
    </Card>
  );
};

export default CorrelationArticleCard;
