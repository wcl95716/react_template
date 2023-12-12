import { Card, List } from 'antd';
import { Link } from 'umi';

import hotQuestion from '@/mock/hot-question.json';

import './index.less';

const HotQuestionCard = () => {
  return (
    <Card size="small" title="热门问答" className="hot-question-card">
      <List
        size="small"
        dataSource={hotQuestion}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/q/${item.id}`}>{item.title}</Link>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default HotQuestionCard;
