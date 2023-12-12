import { Card, Tag } from 'antd';

import tags from '@/mock/tag.json';

import './index.less';

const HotTagCard = () => {
  return (
    <Card size="small" title="热门标签" className="hot-tag-card">
      {tags.map((item) => {
        return (
          <span key={item.tag_id} className="hot-tag">
            <Tag
              key={item.tag_id}
              icon={
                <img
                  src={`https://moose-plus.oss-cn-shenzhen.aliyuncs.com/icons/tag/${item.icon}`}
                />
              }
            >
              {item.tag_name}
            </Tag>
          </span>
        );
      })}
    </Card>
  );
};
export default HotTagCard;
